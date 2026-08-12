# 🛡️ PhishGuard AI

https://phishguard-ai-936423989483.asia-southeast1.run.app

> AI-Powered Phishing & Social Engineering Detection System

PhishGuard AI is a full-stack cybersecurity application designed to detect and analyze potential phishing and social-engineering attacks.

The system combines AI-powered NLP analysis, domain and URL forensics, and visual brand-mimicry analysis to generate a unified threat score and security verdict.

---

## 🚀 Features

- 🤖 AI-Powered NLP Analysis
  - Analyzes suspicious messages using Google Gemini
  - Detects urgency and social-engineering patterns
  - Identifies credential-harvesting attempts
  - Detects authority and brand impersonation

- 🔍 Domain & URL Forensics
  - Detects suspicious domains
  - Identifies typosquatting
  - Uses Levenshtein distance for domain similarity
  - Detects suspicious TLDs
  - Identifies URL shorteners
  - Detects brand impersonation
  - Analyzes suspicious domain patterns

- 👁️ Visual Brand-Mimicry Detection
  - Detects potential cloned login portals
  - Analyzes simulated DOM/CSS similarity
  - Detects potential credential-harvesting forms
  - Identifies possible brand-style imitation

- 🧠 Multi-Layer Threat Detection
  - Combines results from multiple security layers
  - Generates a threat score from 0–100
  - Provides a final security verdict

- 📊 Interactive Analysis Dashboard
  - Real-time scanning pipeline
  - Threat score visualization
  - Layer-by-layer analysis
  - Security findings
  - Analysis logs
  - Security recommendations

- 🧪 Built-in Test Scenarios
  - Legitimate security alert
  - Classic phishing attack
  - AI-generated spear-phishing attack

- 🔄 Fallback Detection
  - Uses local heuristic analysis when Gemini is unavailable
  - Allows the application to continue functioning without an active AI response

- 📱 Responsive UI
  - Modern cybersecurity dashboard
  - Responsive design
  - Clean and interactive interface

---

## 🎯 Problem Statement

Phishing attacks are becoming increasingly sophisticated.

Traditional phishing detection systems often depend heavily on:

- Static rules
- Blacklists
- Known malicious URLs
- Keyword matching

Modern attacks can bypass these methods by using:

- AI-generated messages
- Lookalike domains
- URL shorteners
- Fake login portals
- Brand impersonation
- Social-engineering techniques

PhishGuard AI addresses this problem by combining multiple detection techniques into a single analysis pipeline.

---

## 💡 Solution

PhishGuard AI analyzes suspicious communication through three major detection layers:

    User Input
        │
        ▼
    ┌─────────────────────────────┐
    │     PhishGuard AI Engine    │
    └──────────────┬──────────────┘
                   │
           ┌───────┼────────┐
           │       │        │
           ▼       ▼        ▼
         NLP    Domain    Visual
       Analysis Forensics Mimicry
           │       │        │
           └───────┼────────┘
                   │
                   ▼
          Threat Score Fusion
                   │
                   ▼
           Final Security Verdict
                   │
           ┌───────┼────────┐
           ▼       ▼        ▼
         SAFE   CAUTION   DANGER

---

## 🏗️ System Architecture

    ┌──────────────────────┐
    │        User          │
    │                      │
    │ Message / Domain /   │
    │     Landing URL     │
    └──────────┬───────────┘
               │
               ▼
    ┌──────────────────────┐
    │   PhishGuard Engine  │
    └──────────┬───────────┘
               │
       ┌───────┼────────┐
       │       │        │
       ▼       ▼        ▼
    ┌──────┐ ┌──────┐ ┌──────┐
    │ NLP  │ │Domain│ │Visual│
    │Layer │ │Layer │ │Layer │
    └──┬───┘ └──┬───┘ └──┬───┘
       │        │        │
       └────────┼────────┘
                │
                ▼
       ┌─────────────────┐
       │ Threat Fusion   │
       │                 │
       │ Weighted Score  │
       └────────┬────────┘
                │
                ▼
       ┌─────────────────┐
       │ Final Verdict   │
       │                 │
       │ SAFE / CAUTION  │
       │ / DANGER        │
       └─────────────────┘

---

## 🔬 Detection Layers

### 1. AI-Powered NLP Analysis

The NLP layer analyzes suspicious messages for social-engineering indicators.

It can detect:

- Artificial urgency
- Account suspension threats
- Authority impersonation
- Security-team impersonation
- Credential harvesting
- Forced re-authentication
- Financial bait
- Suspicious calls to action
- Brand impersonation

Google Gemini is used for AI-powered analysis when the API is available.

If Gemini is unavailable, PhishGuard AI uses local heuristic analysis.

---

### 2. Domain & URL Forensics

The domain analysis layer investigates suspicious domains and URLs.

It checks for:

- Official-domain mismatches
- Typosquatting
- Brand impersonation
- Suspicious TLDs
- Trust-signaling words
- URL shorteners
- Suspicious domain structures
- Domain similarity

Example:

    paypal-secure-verify.com

This may be suspicious because it contains a trusted brand name while not being the official domain.

---

### 3. Visual Brand-Mimicry Analysis

The visual analysis layer evaluates whether a suspicious website may be attempting to imitate a legitimate brand.

The current implementation uses simulated analysis techniques such as:

- DOM/CSS similarity
- Brand-style matching
- Login-page cloning indicators
- Credential-input detection

This layer is designed so that real computer-vision and browser-based analysis can be integrated in future versions.

---

## 🧠 Threat Scoring

PhishGuard AI combines the results from all detection layers into a single threat score.

    Composite Score =
        NLP Score     × 0.35
      + Domain Score  × 0.40
      + Visual Score  × 0.25

### Verdict Levels

| Score | Verdict | Meaning |
|------:|---------|---------|
| 0–34 | 🟢 SAFE | No major threat indicators detected |
| 35–64 | 🟡 CAUTION | Suspicious indicators detected |
| 65–100 | 🔴 DANGER | Strong phishing indicators detected |

---

## 🛠️ Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Lucide React
- Motion

### Backend

- Node.js
- Express
- TypeScript
- Vite

### AI

- Google Gemini
- Google Generative AI SDK

### Security Analysis

- NLP heuristics
- Levenshtein distance
- Domain analysis
- URL analysis
- Brand impersonation detection
- Typosquatting detection
- URL-shortener detection
- Visual mimicry analysis
- Weighted threat scoring

---

## 📁 Project Structure

    phishguard-ai/
    │
    ├── assets/
    │   └── .aistudio/
    │
    ├── src/
    │   ├── components/
    │   │   ├── AnalysisConsole.tsx
    │   │   ├── CaseIntake.tsx
    │   │   ├── Footer.tsx
    │   │   └── Header.tsx
    │   │
    │   ├── utils/
    │   │   └── forensics.ts
    │   │
    │   ├── App.tsx
    │   ├── index.css
    │   ├── main.tsx
    │   └── types.ts
    │
    ├── .env.example
    ├── .gitignore
    ├── bun.lock
    ├── index.html
    ├── package.json
    ├── server.ts
    ├── tsconfig.json
    ├── vite.config.ts
    └── README.md

---

## ⚙️ Installation

### Prerequisites

Make sure the following are installed:

- Node.js 18+
- npm or Bun
- Google Gemini API Key

Check Node.js:

    node --version

Check npm:

    npm --version

### 1. Clone the Repository

    git clone https://github.com/your-username/phishguard-ai.git
    cd phishguard-ai

### 2. Install Dependencies

Using npm:

    npm install

Or using Bun:

    bun install

### 3. Configure Environment Variables

Create a `.env` file in the project root:

    GEMINI_API_KEY=your_gemini_api_key

You can also copy the example environment file:

    cp .env.example .env

Then replace the placeholder with your actual Gemini API key.

> ⚠️ Never commit your `.env` file or expose your API key in frontend code.

---

## ▶️ Running the Application

Start the development server:

    npm run dev

Or:

    bun run dev

Open the application in your browser:

    http://localhost:3000

---

## 🏭 Production Build

Create a production build:

    npm run build

Start the production server:

    npm start

---

## 🧪 Testing

PhishGuard AI provides sample scenarios for testing the detection pipeline.

### Test Case 1 — Legitimate Security Alert

    Message:
    Google Security Alert

    Domain:
    accounts.google.com

Expected result:

    Low threat score
    SAFE

### Test Case 2 — Classic Phishing

    Message:
    URGENT: Your PayPal account has been suspended.
    Verify your identity within 24 hours or your account
    will be permanently closed.

    Domain:
    paypal-secure-verify.com

    URL:
    https://bit.ly/3xYz90a

Expected indicators:

- Artificial urgency
- Brand impersonation
- Suspicious domain
- URL shortener
- Credential/social-engineering indicators

Expected verdict:

    DANGER

### Test Case 3 — AI Spear Phishing

    Message:
    Microsoft 365 compliance message requiring immediate
    account verification.

    Domain:
    micros0ft-support-portal.net

Expected indicators:

- Authority impersonation
- Credential verification
- Typosquatting
- Suspicious domain
- Brand impersonation

Expected verdict:

    DANGER

---

## 🔌 API

The backend provides an NLP analysis endpoint.

### POST `/api/analyze-nlp`

Example request:

    {
      "message": "Your account has been suspended. Verify immediately.",
      "domain": "example-secure-login.com",
      "url": "https://example.com/login"
    }

Example response:

    {
      "success": true,
      "data": {
        "score": 82,
        "flags": [
          "Artificial urgency detected",
          "Credential verification request detected"
        ],
        "cleanNotes": [],
        "brandClaimed": null
      }
    }

If Gemini is unavailable, the system falls back to local heuristic analysis.

---

## 🧩 Core Security Functions

The main security-analysis logic is implemented in:

    src/utils/forensics.ts

Important functions include:

- `getLevenshteinDistance()`
- `normalizeDomain()`
- `analyzeLocalNLP()`
- `analyzeDomainForensics()`
- `analyzeVisualMimicry()`
- `fuseThreatAnalysis()`

---

## 🔍 Levenshtein Distance

PhishGuard AI uses Levenshtein distance to identify potentially similar domains.

Example:

    Official:
    microsoft.com

    Suspicious:
    micros0ft.com

A small character difference can indicate a possible typosquatting attempt.

---

## 🔄 Fallback Architecture

The application is designed to remain functional even when the AI service is unavailable.

    User Input
        │
        ▼
    NLP Analysis
        │
        ├───────────────┐
        │               │
        ▼               ▼
    Gemini Available   Gemini Failed
        │               │
        ▼               ▼
    Gemini AI      Local Heuristics
        │               │
        └───────┬───────┘
                │
                ▼
         Threat Analysis

---

## 📊 Analysis Pipeline

    1. User enters suspicious information
                  ↓
    2. Input validation
                  ↓
    3. NLP analysis
                  ↓
    4. Domain & URL forensics
                  ↓
    5. Visual brand-mimicry analysis
                  ↓
    6. Threat-score calculation
                  ↓
    7. Findings are combined
                  ↓
    8. Final verdict generated
                  ↓
    9. Security recommendation displayed

---

## 🖥️ User Interface

The application contains two primary sections.

### Case Intake

Users can enter:

- Suspicious message
- Sender domain
- Landing URL

Predefined scenarios can also be selected for testing.

### Analysis Console

The console displays:

- Overall threat score
- Final verdict
- NLP findings
- Domain findings
- Visual analysis
- Threat indicators
- Safe indicators
- Real-time analysis logs
- Recommended action

---

## 🔐 Security Considerations

PhishGuard AI is designed for:

- Educational purposes
- Cybersecurity demonstrations
- Research
- Defensive security analysis
- Phishing-awareness training

The current implementation should not be considered a replacement for enterprise security solutions.

Some analysis components are heuristic or simulated.

The current version does not perform:

- Live WHOIS lookup
- Real-time domain reputation lookup
- Real URL crawling
- Malware sandboxing
- Real screenshot computer vision
- Real browser DOM inspection
- Enterprise threat-intelligence correlation

---

## 🚧 Future Improvements

### Security

- [ ] Google Safe Browsing integration
- [ ] VirusTotal API integration
- [ ] Real WHOIS/domain-age lookup
- [ ] DNS analysis
- [ ] SSL certificate analysis
- [ ] IP reputation analysis
- [ ] Threat-intelligence feeds
- [ ] Real URL reputation scoring

### AI & Computer Vision

- [ ] Real screenshot analysis
- [ ] OCR-based phishing detection
- [ ] Logo similarity detection
- [ ] Real DOM/CSS fingerprinting
- [ ] Computer-vision-based brand detection
- [ ] Improved phishing classification model

### Application Features

- [ ] User authentication
- [ ] Scan history
- [ ] Database integration
- [ ] Exportable security reports
- [ ] Batch email scanning
- [ ] Browser extension
- [ ] Admin dashboard
- [ ] Enterprise monitoring
- [ ] Email security integration

---

## 🧪 Example Detection

Input:

    URGENT: Your PayPal account has been suspended.
    Verify your identity within 24 hours.

Domain:

    paypal-secure-verify.com

URL:

    https://bit.ly/3xYz90a

Analysis:

    NLP Layer
    ├── Artificial urgency
    ├── Account suspension threat
    └── Credential verification request

    Domain Layer
    ├── Brand impersonation
    ├── Suspicious domain
    ├── Typosquatting indicators
    └── URL shortener

    Visual Layer
    └── Potential brand-mimicry indicators

    Final Result
    └── 🔴 DANGER

---

## 📜 Development Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm start` | Start production server |
| `npm run preview` | Preview production build |
| `npm run lint` | Run lint/type checks |
| `npm run clean` | Remove generated files |

---

## 🤝 Contributing

Contributions are welcome.

### 1. Fork the repository

### 2. Create a feature branch

    git checkout -b feature/your-feature

### 3. Make your changes

### 4. Test the application

### 5. Commit your changes

    git commit -m "feat: add phishing detection feature"

### 6. Push your branch

    git push origin feature/your-feature

### 7. Create a Pull Request

---

## ⚠️ Disclaimer

PhishGuard AI is developed for educational, research, demonstration, and defensive cybersecurity purposes.

Detection results are probabilistic and heuristic-based.

A `SAFE` result does not guarantee that a message, domain, or URL is completely harmless.

Always verify suspicious communications through trusted and independent channels before:

- Entering credentials
- Making payments
- Opening unknown attachments
- Sharing sensitive information
- Installing software

---

## 📄 License

This project is intended for educational and demonstration purposes.

Add an appropriate open-source license before distributing the project publicly.

---

## ⭐ Project Highlights

- ✓ AI-powered phishing detection
- ✓ Multi-layer threat analysis
- ✓ Google Gemini integration
- ✓ NLP social-engineering detection
- ✓ Domain forensics
- ✓ Levenshtein typosquatting detection
- ✓ URL shortener detection
- ✓ Brand impersonation detection
- ✓ Visual mimicry analysis
- ✓ Threat score fusion
- ✓ Real-time analysis console
- ✓ Local fallback detection
- ✓ Responsive React UI
- ✓ TypeScript architecture
- ✓ Express backend
- ✓ Vite development environment

---

## 🛡️ PhishGuard AI

> Detect suspicious signals. Understand the threat. Act safely.

Built with ❤️ for cybersecurity awareness and defensive technology.
