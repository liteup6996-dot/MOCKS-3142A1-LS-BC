import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Copy,
  Check,
  Clock,
  Play,
  Pause,
  RotateCcw,
  ClipboardCheck,
  Globe,
  Headphones
} from 'lucide-react';

interface TopBannerProps {
  sessionID: string;
  candidateName: string;
  deploymentUrl?: string;
  masterSeconds: number;
  isMasterTimerRunning: boolean;
  onToggleMasterTimer: () => void;
  onResetMasterTimer: () => void;
  onScrollToMarking: () => void;
}

export const TopBanner: React.FC<TopBannerProps> = ({
  sessionID = 'VV-A1-13789JH',
  candidateName = 'Miss Aamra',
  deploymentUrl = 'Mock-LM-VV-A1-13789JH',
  masterSeconds,
  isMasterTimerRunning,
  onToggleMasterTimer,
  onResetMasterTimer,
  onScrollToMarking,
}) => {
  const [copiedSession, setCopiedSession] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [blink, setBlink] = useState(true);

  // Blinking green dot effect for Live Connection Status
  useEffect(() => {
    const interval = setInterval(() => {
      setBlink((prev) => !prev);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopySession = () => {
    navigator.clipboard.writeText(sessionID);
    setCopiedSession(true);
    setTimeout(() => setCopiedSession(false), 2000);
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(deploymentUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${rem.toString().padStart(2, '0')}`;
  };

  return (
    <header className="relative w-full border-b border-[#720000]/25 bg-white shadow-xs z-30 select-none">
      {/* Persistent Dark Maroon Top Banner */}
      <div className="bg-[#720000] text-white px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs tracking-wide">
        <div className="flex items-center gap-2 font-semibold">
          <ShieldCheck className="w-4 h-4 text-emerald-300 shrink-0" />
          <span className="font-bold tracking-tight text-sm">
            Vocal Vantage Secure Assessment Gateway | Live Listening Session
          </span>
        </div>

        {/* Top Right: Live Connection Status, Candidate ID & Deployment Verification Route */}
        <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono">
          {/* Live Connection Status indicator with blinking green dot */}
          <div className="flex items-center gap-1.5 bg-black/25 px-2.5 py-1 rounded border border-white/10 shadow-2xs">
            <span
              className={`w-2 h-2 rounded-full bg-emerald-400 transition-opacity duration-300 ${
                blink ? 'opacity-100 shadow-[0_0_8px_#34d399]' : 'opacity-25'
              }`}
            />
            <span className="text-[11px] text-emerald-300 font-medium tracking-wider uppercase">
              Live Connection
            </span>
          </div>

          {/* Candidate ID */}
          <div className="flex items-center gap-1.5 bg-black/25 px-2.5 py-1 rounded border border-white/10 shadow-2xs text-[11px]">
            <span className="text-white/70">ID:</span>
            <span className="font-bold text-white tracking-widest">{sessionID}</span>
            <button
              onClick={handleCopySession}
              title="Copy Candidate ID"
              className="text-white/70 hover:text-white transition-colors cursor-pointer ml-0.5"
            >
              {copiedSession ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Deployment Route Identifier */}
          <div className="flex items-center gap-1.5 bg-black/25 px-2.5 py-1 rounded border border-emerald-400/30 text-[11px]">
            <Globe className="w-3.5 h-3.5 text-emerald-300" />
            <span className="text-emerald-300 font-bold tracking-wider">{deploymentUrl}</span>
            <button
              onClick={handleCopyUrl}
              title="Copy Deployment URL Identifier"
              className="text-emerald-300 hover:text-white transition-colors cursor-pointer ml-0.5"
            >
              {copiedUrl ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Operational Header with Candidate Summary, 1 Main Session Timer, and Assessment Type */}
      <div className="px-5 py-2.5 bg-white border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
        {/* Candidate & Stage Info */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded bg-[#720000] text-white flex items-center justify-center font-bold text-sm tracking-wider shadow-xs">
            VV
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase font-bold text-[#720000] tracking-wider flex items-center gap-1">
                <Headphones className="w-3.5 h-3.5 text-[#720000]" />
                <span>IELTS Life Skills A1 · Listening Assessment</span>
              </span>
              <span className="text-slate-300">·</span>
              <span className="text-xs text-slate-500 font-medium">
                4 Audio Sections (25 Questions)
              </span>
            </div>
            <div className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              <span>Candidate:</span>
              <span className="text-[#800000] font-bold underline decoration-dotted underline-offset-4 font-mono">
                {candidateName.trim() || 'Miss Aamra'}
              </span>
              <span className="text-xs font-mono text-slate-400">({sessionID})</span>
            </div>
          </div>
        </div>

        {/* 1 Main Overall Master Timer & Navigation Button */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 px-3.5 py-1.5 rounded-lg shadow-2xs">
            <Clock className="w-4 h-4 text-[#800000]" />
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                Overall Session Timer (60 Mins)
              </span>
              <span
                className={`font-mono text-lg font-bold tabular-nums leading-none ${
                  masterSeconds < 300 ? 'text-red-600 animate-pulse' : 'text-slate-900'
                }`}
              >
                {formatTime(masterSeconds)}
              </span>
            </div>
            <div className="flex items-center gap-1.5 border-l border-slate-200 pl-3">
              <button
                onClick={onToggleMasterTimer}
                className={`px-2.5 py-1 rounded text-white text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                  isMasterTimerRunning
                    ? 'bg-amber-600 hover:bg-amber-700'
                    : 'bg-[#800000] hover:bg-[#660000]'
                }`}
                title={isMasterTimerRunning ? 'Pause Main Timer' : 'Start Main Timer'}
              >
                {isMasterTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isMasterTimerRunning ? 'Pause' : 'Start Timer'}</span>
              </button>
              <button
                onClick={onResetMasterTimer}
                className="p-1.5 rounded bg-slate-200 text-slate-700 hover:bg-slate-300 transition-colors cursor-pointer"
                title="Reset Main Timer to 60:00"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick Jump to Bottom Instructor Marking Portal */}
          <button
            onClick={onScrollToMarking}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer border bg-[#800000] border-[#800000] text-white hover:bg-[#660000] shadow-xs"
            title="Scroll directly down to the Instructor Marking Portal at the end of the page"
          >
            <ClipboardCheck className="w-4 h-4 text-emerald-300" />
            <span>Instructor Marking Portal ↓</span>
          </button>
        </div>
      </div>
    </header>
  );
};
