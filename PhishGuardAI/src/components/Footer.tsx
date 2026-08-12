import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="pt-8 pb-4 border-t border-[var(--hair)] mt-10 text-center">
      <p className="text-[11px] font-mono text-[var(--muted-2)] max-w-xl mx-auto leading-relaxed">
        PhishGuard AI Prototype • Multi-Layer Security Architecture Combining Gemini API Neural Classification and Forensic Heuristics
      </p>
    </footer>
  );
};
