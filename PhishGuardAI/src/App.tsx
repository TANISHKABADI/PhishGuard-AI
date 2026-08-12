import React, { useState } from 'react';
import { Header } from './components/Header';
import { CaseIntake } from './components/CaseIntake';
import { AnalysisConsole } from './components/AnalysisConsole';
import { Footer } from './components/Footer';
import { LogEntry, AnalysisResults, LayerResult } from './types';
import { 
  analyzeLocalNLP, 
  analyzeDomainForensics, 
  analyzeVisualMimicry, 
  fuseThreatAnalysis,
  SAMPLE_SCENARIOS
} from './utils/forensics';

export default function App() {
  const [message, setMessage] = useState<string>(SAMPLE_SCENARIOS[1].message);
  const [domain, setDomain] = useState<string>(SAMPLE_SCENARIOS[1].domain);
  const [url, setUrl] = useState<string>(SAMPLE_SCENARIOS[1].url);

  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [hasScanned, setHasScanned] = useState<boolean>(false);
  const [scanLogs, setScanLogs] = useState<LogEntry[]>([]);
  const [activeLayerStep, setActiveLayerStep] = useState<number>(0);
  const [results, setResults] = useState<AnalysisResults | null>(null);

  const addLog = (text: string, type: LogEntry['type'] = 'info') => {
    const timestamp = new Date().toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    setScanLogs((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).substring(2, 9),
        timestamp,
        text,
        type,
      },
    ]);
  };

  const handleRunScan = async () => {
    if (isScanning) return;

    setIsScanning(true);
    setHasScanned(true);
    setScanLogs([]);
    setActiveLayerStep(0);
    setResults(null);

    // Timeline sequence with staggered delays for realistic "thinking"
    addLog('> Initializing PhishGuard AI neural pipeline...', 'info');

    setTimeout(async () => {
      addLog('> Executing Layer 1: NLP Intent & Sentiment (Gemini API)...', 'layer1');

      let layer1Result: LayerResult;

      try {
        const response = await fetch('/api/analyze-nlp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message, domain, url }),
        });

        const data = await response.json();

        if (data.success && data.data) {
          layer1Result = {
            score: data.data.score,
            flags: data.data.flags,
            cleanNotes: data.data.cleanNotes,
            brandClaimed: data.data.brandClaimed,
          };
        } else {
          // Fall back to local NLP heuristics if Gemini call returned fallback flag
          layer1Result = analyzeLocalNLP(message, domain);
        }
      } catch (err) {
        // Fall back gracefully on network or API failure
        layer1Result = analyzeLocalNLP(message, domain);
      }

      setTimeout(() => {
        addLog(`> Layer 1 Complete: NLP Risk Score = ${layer1Result.score}/100`, 'layer1');
        setActiveLayerStep(1);

        setTimeout(() => {
          addLog('> Executing Layer 2: Link & Domain Forensics...', 'layer2');
          const layer2Result = analyzeDomainForensics(domain, url);

          setTimeout(() => {
            addLog(`> Layer 2 Complete: Domain Risk Score = ${layer2Result.score}/100`, 'layer2');
            setActiveLayerStep(2);

            setTimeout(() => {
              addLog('> Executing Layer 3: Visual Brand-Mimicry Analysis...', 'layer3');
              const layer3Result = analyzeVisualMimicry(domain, layer1Result, layer2Result);

              setTimeout(() => {
                addLog(`> Layer 3 Complete: Visual Mimicry Score = ${layer3Result.score}/100`, 'layer3');
                setActiveLayerStep(3);

                setTimeout(() => {
                  addLog('> Fusing multi-layer threat vector signals...', 'fusion');
                  const finalAnalysis = fuseThreatAnalysis(layer1Result, layer2Result, layer3Result);

                  setTimeout(() => {
                    setResults(finalAnalysis);
                    setActiveLayerStep(4);
                    addLog(`> Composite Threat Index: ${finalAnalysis.compositeScore}/100`, 'complete');
                    addLog(`> Scan complete. Verdict rendered: ${finalAnalysis.verdictTitle}`, 'complete');
                    setIsScanning(false);
                  }, 500);
                }, 500);
              }, 600);
            }, 500);
          }, 600);
        }, 500);
      }, 600);
    }, 300);
  };

  return (
    <div className="min-h-screen py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col justify-between">
      <div className="space-y-6">
        {/* Header */}
        <Header isScanning={isScanning} />

        {/* Main 2-Column Desktop Grid / 1-Column Mobile Layout */}
        <main className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Case Intake (~400px equivalent on desktop: 4 or 5 cols) */}
          <div className="lg:col-span-4 h-full">
            <CaseIntake
              message={message}
              setMessage={setMessage}
              domain={domain}
              setDomain={setDomain}
              url={url}
              setUrl={setUrl}
              onRunScan={handleRunScan}
              isScanning={isScanning}
            />
          </div>

          {/* Right Column: Analysis Console (flexible width: 8 cols) */}
          <div className="lg:col-span-8 h-full">
            <AnalysisConsole
              hasScanned={hasScanned}
              isScanning={isScanning}
              scanLogs={scanLogs}
              results={results}
              activeLayerStep={activeLayerStep}
            />
          </div>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
