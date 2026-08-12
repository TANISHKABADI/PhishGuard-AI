import React, { useState, useEffect, useRef } from 'react';
import { AnalysisResults, LayerResult, LogEntry } from '../types';
import { 
  Shield, 
  ShieldCheck, 
  AlertTriangle, 
  OctagonX, 
  ChevronDown, 
  ChevronUp, 
  Terminal, 
  Brain, 
  SearchCode, 
  Eye, 
  Check, 
  TriangleAlert
} from 'lucide-react';

interface AnalysisConsoleProps {
  hasScanned: boolean;
  isScanning: boolean;
  scanLogs: LogEntry[];
  results: AnalysisResults | null;
  activeLayerStep: number; // 0 = idle, 1 = layer 1 done, 2 = layer 2 done, 3 = layer 3 done, 4 = fusion done
}

export const AnalysisConsole: React.FC<AnalysisConsoleProps> = ({
  hasScanned,
  isScanning,
  scanLogs,
  results,
  activeLayerStep,
}) => {
  const [expandedLayers, setExpandedLayers] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: true,
  });

  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [scanLogs]);

  const toggleLayerExpand = (layerNum: number) => {
    setExpandedLayers((prev) => ({
      ...prev,
      [layerNum]: !prev[layerNum],
    }));
  };

  // Helper to get score color
  const getScoreColor = (score: number) => {
    if (score >= 65) return { text: 'text-[var(--red)]', bg: 'bg-[#C1585F]', border: 'border-[var(--red)]' };
    if (score >= 35) return { text: 'text-[var(--amber)]', bg: 'bg-[#BF8A4A]', border: 'border-[var(--amber)]' };
    return { text: 'text-[#8A6B78]', bg: 'bg-[#A98FBE]', border: 'border-[var(--teal)]' };
  };

  // Helper for Circular Radar Dial calculation
  const renderCompositeDial = (score: number) => {
    const radius = 38;
    const circumference = 2 * Math.PI * radius;
    const animatedScore = activeLayerStep >= 4 ? score : 0;
    const strokeDashoffset = circumference - (animatedScore / 100) * circumference;
    const colorInfo = getScoreColor(animatedScore);

    return (
      <div className="flex flex-col items-center justify-center">
        <div className="relative w-24 h-24 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            {/* Track */}
            <circle
              cx="48"
              cy="48"
              r={radius}
              className="stroke-[var(--hair)] fill-none"
              strokeWidth="6"
            />
            {/* Filled Progress Arc */}
            <circle
              cx="48"
              cy="48"
              r={radius}
              className={`fill-none transition-all duration-1000 ease-out stroke-current ${colorInfo.text}`}
              strokeWidth="6"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className={`text-2xl font-bold font-display ${colorInfo.text}`}>
              {activeLayerStep >= 4 ? score : '--'}
            </span>
            <span className="text-[9px] font-mono font-medium text-[var(--muted-2)] uppercase tracking-tight">
              / 100
            </span>
          </div>
        </div>
        <span className="text-[11px] font-mono font-semibold text-[var(--muted)] uppercase tracking-wider mt-1.5">
          Composite Risk
        </span>
      </div>
    );
  };

  if (!hasScanned && !isScanning) {
    return (
      <div className="bg-[var(--panel)] border border-[var(--hair)] rounded-[14px] p-8 shadow-sm flex flex-col items-center justify-center min-h-[520px] text-center">
        <div className="w-16 h-16 rounded-2xl bg-[var(--panel-2)] border border-[var(--hair)] flex items-center justify-center text-[var(--muted)] mb-4">
          <Shield className="w-8 h-8 opacity-60" />
        </div>
        <h3 className="text-lg font-bold font-display text-[var(--text)] mb-1.5">
          Analysis Console Awaiting Input
        </h3>
        <p className="text-xs text-[var(--muted)] max-w-md leading-relaxed font-sans mb-6">
          Paste a suspicious message and domain on the left, or pick one of the sample scenarios to execute the three independent threat detection layers.
        </p>
        <div className="flex items-center gap-4 text-xs font-mono text-[var(--muted-2)]">
          <span className="flex items-center gap-1"><Brain className="w-3.5 h-3.5" /> 1. Gemini NLP</span>
          <span>•</span>
          <span className="flex items-center gap-1"><SearchCode className="w-3.5 h-3.5" /> 2. Domain Forensics</span>
          <span>•</span>
          <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> 3. Visual Mimicry</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[var(--panel)] border border-[var(--hair)] rounded-[14px] p-5 shadow-sm space-y-5">
      {/* Top Console Bar: Circular Score Dial & Live Scan Log */}
      <div className="bg-[var(--panel-2)] border border-[var(--hair)] rounded-xl p-4 flex flex-col sm:flex-row items-center gap-5">
        {/* Radar Dial */}
        <div className="flex-shrink-0 sm:pr-4 sm:border-r border-[var(--hair)]">
          {renderCompositeDial(results?.compositeScore || 0)}
        </div>

        {/* Scan Log & Live Verdict Status */}
        <div className="flex-1 w-full min-w-0">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-mono font-semibold text-[var(--muted)] uppercase tracking-wider flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-[var(--blue)]" />
              Live Verdict & Pipeline Log
            </span>
            <span className="text-[10px] font-mono text-[var(--muted-2)]">
              {isScanning ? 'PROCESSING...' : 'COMPLETE'}
            </span>
          </div>

          <div className="bg-[var(--panel)] border border-[var(--hair)] rounded-lg p-2.5 h-28 overflow-y-auto font-mono text-[11px] space-y-1">
            {scanLogs.map((log) => (
              <div key={log.id} className="text-[var(--text)] leading-snug flex items-start gap-1.5">
                <span className="text-[var(--muted-2)] text-[10px] select-none">[{log.timestamp}]</span>
                <span className={log.type === 'complete' ? 'text-[var(--red)] font-semibold' : 'text-[var(--text)]'}>
                  {log.text}
                </span>
              </div>
            ))}
            <div ref={logEndRef} />
          </div>
        </div>
      </div>

      {/* Stacked Layer Cards */}
      <div className="space-y-3">
        {/* LAYER 1 CARD */}
        <LayerCard
          index="01"
          name="NLP Intent & Sentiment Analysis"
          subtitle="Gemini AI Threat Classification & Psychological Manipulation Vectors"
          icon={<Brain className="w-4 h-4 text-[var(--blue)]" />}
          layerData={results?.layer1}
          isDone={activeLayerStep >= 1}
          isExpanded={!!expandedLayers[1]}
          onToggle={() => toggleLayerExpand(1)}
        />

        {/* LAYER 2 CARD */}
        <LayerCard
          index="02"
          name="Link & Domain Forensics"
          subtitle="Typosquatting, Levenshtein Distance & TLD Reputation Metrics"
          icon={<SearchCode className="w-4 h-4 text-[var(--blue)]" />}
          layerData={results?.layer2}
          isDone={activeLayerStep >= 2}
          isExpanded={!!expandedLayers[2]}
          onToggle={() => toggleLayerExpand(2)}
        />

        {/* LAYER 3 CARD */}
        <LayerCard
          index="03"
          name="Visual Brand-Mimicry (CV)"
          subtitle="Cloned DOM Layout, CSS Token Matching & Logo Fingerprinting"
          icon={<Eye className="w-4 h-4 text-[var(--blue)]" />}
          layerData={results?.layer3}
          isDone={activeLayerStep >= 3}
          isExpanded={!!expandedLayers[3]}
          onToggle={() => toggleLayerExpand(3)}
        />
      </div>

      {/* Final Composite Verdict Banner */}
      {activeLayerStep >= 4 && results && (
        <VerdictBanner
          tier={results.verdictTier}
          title={results.verdictTitle}
          reason={results.verdictReason}
          score={results.compositeScore}
        />
      )}
    </div>
  );
};

interface LayerCardProps {
  index: string;
  name: string;
  subtitle: string;
  icon: React.ReactNode;
  layerData?: LayerResult;
  isDone: boolean;
  isExpanded: boolean;
  onToggle: () => void;
}

const LayerCard: React.FC<LayerCardProps> = ({
  index,
  name,
  subtitle,
  icon,
  layerData,
  isDone,
  isExpanded,
  onToggle,
}) => {
  const score = layerData?.score || 0;
  const isHighRisk = score >= 45;

  return (
    <div
      className={`border rounded-xl transition-all duration-300 overflow-hidden ${
        isDone ? 'opacity-100' : 'opacity-40 grayscale'
      } ${
        isHighRisk && isDone
          ? 'bg-[#FFE2E2]/30 border-[#C1585F] shadow-xs'
          : 'bg-[var(--panel)] border-[var(--hair)]'
      }`}
    >
      {/* Card Header */}
      <div
        onClick={onToggle}
        className="p-3.5 flex items-center justify-between cursor-pointer select-none hover:bg-[var(--panel-2)]/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[var(--panel-2)] border border-[var(--hair)] text-[var(--muted)]">
            {index}
          </span>
          <div className="flex items-center gap-2">
            {icon}
            <div>
              <h4 className="text-xs font-bold font-display text-[var(--text)] flex items-center gap-2">
                {name}
              </h4>
              <p className="text-[10px] text-[var(--muted)] font-mono">{subtitle}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Score Badge */}
          {isDone ? (
            <div
              className={`px-2.5 py-1 rounded-full font-mono font-bold text-xs border ${
                score >= 65
                  ? 'bg-[#FFE2E2] text-[var(--red)] border-[var(--red)]'
                  : score >= 35
                  ? 'bg-[#FFE2E2] text-[var(--amber)] border-[var(--amber)]'
                  : 'bg-[var(--panel-2)] text-[#8A6B78] border-[var(--hair)]'
              }`}
            >
              Score: {score}/100
            </div>
          ) : (
            <span className="text-[11px] font-mono text-[var(--muted-2)]">Analyzing...</span>
          )}

          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-[var(--muted)]" />
          ) : (
            <ChevronDown className="w-4 h-4 text-[var(--muted)]" />
          )}
        </div>
      </div>

      {/* Animated Thin Progress Bar */}
      <div className="w-full bg-[var(--hair)] h-1 overflow-hidden">
        <div
          className={`h-full transition-all duration-700 ease-out ${
            score >= 65 ? 'bg-[var(--red)]' : score >= 35 ? 'bg-[var(--amber)]' : 'bg-[#A98FBE]'
          }`}
          style={{ width: isDone ? `${score}%` : '0%' }}
        />
      </div>

      {/* Expandable Findings Content */}
      {isExpanded && isDone && layerData && (
        <div className="p-3.5 bg-[var(--panel-2)]/40 border-t border-[var(--hair)] space-y-2 text-xs font-mono">
          {/* Red Flags (▲) */}
          {layerData.flags.map((flag, idx) => (
            <div key={`flag-${idx}`} className="flex items-start gap-2 text-[var(--red)]">
              <TriangleAlert className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-[var(--red)]" />
              <span className="leading-snug">{flag}</span>
            </div>
          ))}

          {/* Clean Notes (✓) */}
          {layerData.cleanNotes.map((note, idx) => (
            <div key={`clean-${idx}`} className="flex items-start gap-2 text-[var(--muted)]">
              <Check className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-[#8A6B78]" />
              <span className="leading-snug">{note}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

interface VerdictBannerProps {
  tier: 'safe' | 'caution' | 'danger';
  title: string;
  reason: string;
  score: number;
}

const VerdictBanner: React.FC<VerdictBannerProps> = ({ tier, title, reason, score }) => {
  const getBannerStyle = () => {
    switch (tier) {
      case 'danger':
        return {
          bg: 'bg-[#FFE2E2]',
          border: 'border-[var(--red)]',
          textColor: 'text-[var(--red)]',
          icon: <OctagonX className="w-6 h-6 text-[var(--red)]" />,
        };
      case 'caution':
        return {
          bg: 'bg-[#FFE2E2]',
          border: 'border-[var(--amber)]',
          textColor: 'text-[var(--amber)]',
          icon: <AlertTriangle className="w-6 h-6 text-[var(--amber)]" />,
        };
      case 'safe':
      default:
        return {
          bg: 'bg-[var(--panel-2)]',
          border: 'border-[#A98FBE]',
          textColor: 'text-[#3B2F3D]',
          icon: <ShieldCheck className="w-6 h-6 text-[#A98FBE]" />,
        };
    }
  };

  const style = getBannerStyle();

  return (
    <div
      className={`rounded-xl border-2 p-4 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-4 transition-all duration-500 animate-in fade-in slide-in-from-bottom-2 ${style.bg} ${style.border}`}
    >
      <div className="flex-shrink-0 p-2.5 rounded-lg bg-[var(--panel)] border border-[var(--hair)] shadow-xs">
        {style.icon}
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-[var(--muted)]">
            FINAL VERDICT • {score}/100 RISK
          </span>
        </div>
        <h3 className={`text-base font-bold font-display ${style.textColor} mb-1`}>
          {title}
        </h3>
        <p className="text-xs text-[var(--text)] leading-relaxed font-sans">
          {reason}
        </p>
      </div>
    </div>
  );
};
