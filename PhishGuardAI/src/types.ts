export interface LayerResult {
  score: number; // 0 - 100
  flags: string[]; // Red flags (represented with ▲)
  cleanNotes: string[]; // Clean signals (represented with ✓)
  brandClaimed?: string | null;
  details?: Record<string, any>;
}

export interface AnalysisResults {
  layer1: LayerResult;
  layer2: LayerResult;
  layer3: LayerResult;
  compositeScore: number;
  verdictTier: 'safe' | 'caution' | 'danger';
  verdictTitle: string;
  verdictReason: string;
}

export interface SampleScenario {
  id: 'legit' | 'classic' | 'ai';
  label: string;
  message: string;
  domain: string;
  url: string;
}

export interface LogEntry {
  id: string;
  timestamp: string;
  text: string;
  type: 'info' | 'layer1' | 'layer2' | 'layer3' | 'fusion' | 'complete';
}
