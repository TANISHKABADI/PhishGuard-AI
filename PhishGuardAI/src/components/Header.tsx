import React from 'react';
import { ShieldCheck, Activity } from 'lucide-react';

interface HeaderProps {
  isScanning: boolean;
}

export const Header: React.FC<HeaderProps> = ({ isScanning }) => {
  return (
    <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-[var(--hair)] gap-4">
      <div className="flex items-center gap-3.5">
        {/* Gradient logo tile */}
        <div 
          className="w-11 h-11 rounded-xl flex items-center justify-center text-white shadow-sm flex-shrink-0"
          style={{
            background: 'linear-gradient(135deg, #C5B3D3 0%, #A98FBE 100%)',
          }}
        >
          <ShieldCheck className="w-6 h-6 text-[#3B2F3D]" />
        </div>

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[var(--text)] font-display">
            PhishGuard AI
          </h1>
          <p className="text-xs font-mono font-medium tracking-wider text-[var(--muted)] uppercase mt-0.5">
            Real-time social engineering & phishing shield
          </p>
        </div>
      </div>

      {/* Engine status indicator */}
      <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[var(--panel)] border border-[var(--hair)] shadow-xs self-start sm:self-auto">
        <div className="relative flex items-center justify-center w-2.5 h-2.5">
          <span 
            className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${
              isScanning ? 'animate-ping bg-[var(--red)]' : 'bg-[var(--teal)]'
            }`} 
          />
          <span 
            className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
              isScanning ? 'bg-[var(--red)]' : 'bg-[#A98FBE]'
            }`} 
          />
        </div>
        <span className="text-xs font-mono font-medium text-[var(--text)]">
          {isScanning ? 'Scanning active...' : 'Detection engine idle'}
        </span>
      </div>
    </header>
  );
};
