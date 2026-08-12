import { GoogleGenAI, Type } from "@google/genai";
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

const getAi = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

app.post("/api/analyze-nlp", async (req, res) => {
  try {
    const { message, domain, url } = req.body;
    const ai = getAi();

    if (!ai) {
      return res.json({
        success: false,
        fallback: true,
        reason: "GEMINI_API_KEY environment variable is not configured",
      });
    }

    const prompt = `You are an expert cybersecurity AI phishing and social engineering classifier.
Analyze the following message, its sender domain, and optional landing URL for psychological manipulation, urgency language, authority impersonation, credential harvesting intent, or suspicious request patterns.

Sender Domain: "${domain || "Not provided"}"
Landing URL: "${url || "Not provided"}"
Message Content:
"""
${message || ""}
"""

Return JSON strictly adhering to the schema. Calculate a risk score from 0 (harmless/legitimate) to 100 (severe threat). List specific red flags (citing quotes from the text or tactics used) and clean/reassuring indicators. Identify any brand being impersonated or claimed.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: {
              type: Type.NUMBER,
              description: "Risk score from 0 (safe) to 100 (critical threat)",
            },
            brandClaimed: {
              type: Type.STRING,
              description: "Brand being referenced or impersonated, or null if none",
            },
            flags: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Array of red flags and manipulation indicators found in text",
            },
            cleanNotes: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Array of clean or standard signals found in text",
            },
          },
          required: ["score", "flags", "cleanNotes"],
        },
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No text returned from Gemini API");
    }

    const parsed = JSON.parse(text);
    return res.json({
      success: true,
      data: {
        score: Math.min(100, Math.max(0, Math.round(parsed.score || 0))),
        flags: parsed.flags || [],
        cleanNotes: parsed.cleanNotes || [],
        brandClaimed: parsed.brandClaimed || null,
      },
    });
  } catch (error: any) {
    console.error("Gemini API Error in /api/analyze-nlp:", error);
    return res.json({
      success: false,
      fallback: true,
      reason: error?.message || "Failed to analyze message via Gemini API",
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`PhishGuard AI Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
