import React from 'react';
import { SAMPLE_SCENARIOS } from '../utils/forensics';
import { Search, Sparkles, FileText, Globe, Link2, AlertCircle } from 'lucide-react';

interface CaseIntakeProps {
  message: string;
  setMessage: (val: string) => void;
  domain: string;
  setDomain: (val: string) => void;
  url: string;
  setUrl: (val: string) => void;
  onRunScan: () => void;
  isScanning: boolean;
}

export const CaseIntake: React.FC<CaseIntakeProps> = ({
  message,
  setMessage,
  domain,
  setDomain,
  url,
  setUrl,
  onRunScan,
  isScanning,
}) => {
  const handleSelectSample = (scenarioId: string) => {
    const scenario = SAMPLE_SCENARIOS.find((s) => s.id === scenarioId);
    if (scenario) {
      setMessage(scenario.message);
      setDomain(scenario.domain);
      setUrl(scenario.url);
    }
  };

  const isFormValid = message.trim().length > 0 || domain.trim().length > 0;

  return (
    <div className="bg-[var(--panel)] border border-[var(--hair)] rounded-[14px] p-5 shadow-sm flex flex-col justify-between h-full">
      <div className="space-y-4">
        {/* Section Header */}
        <div className="flex items-center gap-2 pb-2 border-b border-[var(--hair)]">
          <div className="w-1.5 h-4 bg-[var(--blue)] rounded-full" />
          <h2 className="text-xs font-mono font-semibold text-[var(--muted)] uppercase tracking-wider">
            CASE INTAKE & THREAT INPUT
          </h2>
        </div>

        {/* Message Input */}
        <div>
          <label className="block text-xs font-medium text-[var(--text)] mb-1.5 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-[var(--muted)]" />
              Suspicious Message Content
            </span>
            <span className="text-[10px] font-mono text-[var(--muted-2)]">Required</span>
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={isScanning}
            rows={6}
            placeholder="Paste suspicious email text, SMS body, or chat message here..."
            className="w-full bg-[var(--panel-2)] border border-[var(--hair)] rounded-lg p-3 text-xs font-mono text-[var(--text)] placeholder:text-[var(--muted-2)] focus:outline-none focus:ring-2 focus:ring-[var(--blue)] focus:border-transparent resize-none transition-all"
          />
        </div>

        {/* Sending Domain Input */}
        <div>
          <label className="block text-xs font-medium text-[var(--text)] mb-1.5 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-[var(--muted)]" />
              Sender Domain
            </span>
            <span className="text-[10px] font-mono text-[var(--muted-2)]">Required</span>
          </label>
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            disabled={isScanning}
            placeholder="e.g. accounts.google.com or paypal-secure-verify.com"
            className="w-full bg-[var(--panel-2)] border border-[var(--hair)] rounded-lg px-3 py-2 text-xs font-mono text-[var(--text)] placeholder:text-[var(--muted-2)] focus:outline-none focus:ring-2 focus:ring-[var(--blue)] focus:border-transparent transition-all"
          />
        </div>

        {/* Landing Page URL Input */}
        <div>
          <label className="block text-xs font-medium text-[var(--text)] mb-1.5 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Link2 className="w-3.5 h-3.5 text-[var(--muted)]" />
              Landing Page URL
            </span>
            <span className="text-[10px] font-mono text-[var(--muted-2)]">Optional</span>
          </label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={isScanning}
            placeholder="e.g. https://bit.ly/3xYz90a or https://login.portal.net"
            className="w-full bg-[var(--panel-2)] border border-[var(--hair)] rounded-lg px-3 py-2 text-xs font-mono text-[var(--text)] placeholder:text-[var(--muted-2)] focus:outline-none focus:ring-2 focus:ring-[var(--blue)] focus:border-transparent transition-all"
          />
        </div>

        {/* Sample Scenario Buttons */}
        <div className="pt-2">
          <p className="text-[11px] font-mono text-[var(--muted)] mb-2 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[var(--blue)]" />
            Quick Test Scenarios:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {SAMPLE_SCENARIOS.map((scenario) => (
              <button
                key={scenario.id}
                type="button"
                onClick={() => handleSelectSample(scenario.id)}
                disabled={isScanning}
                className="px-2.5 py-1 rounded-full text-[11px] font-mono text-[var(--text)] bg-[var(--panel-2)] border border-[var(--hair)] hover:bg-[#F5CBCB] hover:border-[var(--muted-2)] transition-all disabled:opacity-50 cursor-pointer"
              >
                {scenario.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="pt-6">
        <button
          type="button"
          onClick={onRunScan}
          disabled={isScanning || !isFormValid}
          className={`w-full py-3 px-4 rounded-xl font-display font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-md cursor-pointer ${
            isScanning || !isFormValid
              ? 'bg-[var(--panel-2)] text-[var(--muted-2)] cursor-not-allowed border border-[var(--hair)] shadow-none'
              : 'bg-[#A98FBE] hover:bg-[#997BB2] text-[#3B2F3D] hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0'
          }`}
        >
          {isScanning ? (
            <>
              <div className="w-4 h-4 border-2 border-[#3B2F3D] border-t-transparent rounded-full animate-spin" />
              <span>Scanning Pipeline Active...</span>
            </>
          ) : (
            <>
              <Search className="w-4 h-4 text-[#3B2F3D]" />
              <span>Run PhishGuard Scan</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
