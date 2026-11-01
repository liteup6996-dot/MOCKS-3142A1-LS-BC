/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TopBanner } from './components/TopBanner';
import { CandidateInterface } from './components/CandidateInterface';
import { InstructorPanel } from './components/InstructorPanel';
import { AssessmentReportModal } from './components/AssessmentReportModal';
import { ModuleA1Assessment } from './types';
import { INITIAL_A1_MODULE_ASSESSMENTS } from './data/mockData';

export default function App() {
  // Fixed Candidate ID & Deployment URL Identifier as requested
  const [sessionID] = useState('VV-A1-13789JH');
  const [candidateName, setCandidateName] = useState('Miss Aamra');
  const [deploymentUrl] = useState('Mock-LM-VV-A1-13789JH');

  // Overall 1 Main Session Timer (1 Hour = 60:00 = 3600 seconds)
  const [masterSeconds, setMasterSeconds] = useState(3600);
  const [isMasterTimerRunning, setIsMasterTimerRunning] = useState(false);

  // Module completion state tracking
  const [completedModules, setCompletedModules] = useState<Record<number, boolean>>({
    1: false,
    2: false,
    3: false,
  });

  // Assessment Report Modal Open State
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  // Save Notification Banner
  const [saveAlertMessage, setSaveAlertMessage] = useState<string | null>(null);

  // Module-Wise A1 Assessments (Module 1, Module 2, Module 3 with the 4 IELTS Life Skills A1 criteria)
  const [assessments, setAssessments] = useState<ModuleA1Assessment[]>(INITIAL_A1_MODULE_ASSESSMENTS);

  // Instructor Remarks
  const [remarks, setRemarks] = useState(
    `[09:05] Name spelled clearly letter-by-letter without hesitation.\n[09:12] Candidate gave strong daily routine description using time markers (at 7 AM, then, after).\n[09:22] Formulated authentic neighbor questions in Subsection A; engaged in a natural 6-minute conversation about weekend habits in Subsection B.`
  );

  // Sync browser URL bar with the mock deployment route on mount
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && (window.location.pathname === '/' || window.location.pathname === '')) {
        window.history.replaceState(null, '', `/${deploymentUrl}`);
      }
    } catch {
      // Ignore in restricted environments
    }
  }, [deploymentUrl]);

  // Master Session Clock Ticker (1 Hour)
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isMasterTimerRunning) {
      interval = setInterval(() => {
        setMasterSeconds((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isMasterTimerRunning]);

  const handleToggleModuleComplete = (modId: number) => {
    setCompletedModules((prev) => ({ ...prev, [modId]: !prev[modId] }));
  };

  const handleMarkAllComplete = () => {
    setCompletedModules({ 1: true, 2: true, 3: true });
  };

  const scrollToMarkingPanel = () => {
    const el = document.getElementById('instructor-marking-panel');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Real-time calculation whenever any 1-5 button is clicked
  const handleUpdateScore = (
    moduleId: number,
    criterionId: 'obtaining' | 'conveying' | 'speaking' | 'discussion',
    score: number
  ) => {
    setAssessments((prev) =>
      prev.map((mod) => {
        if (mod.moduleId !== moduleId) return mod;
        return {
          ...mod,
          criteria: mod.criteria.map((c) => (c.id === criterionId ? { ...c, score } : c)),
        };
      })
    );
  };

  // Total Score Calculation: 4 criteria * 5 max = 20 pts/module. 3 modules = 60 pts overall.
  const totalScore = assessments.reduce(
    (acc, mod) => acc + mod.criteria.reduce((cAcc, curr) => cAcc + curr.score, 0),
    0
  );
  const isPassed = totalScore >= 36;

  const handleSaveReport = (summary: { name: string; totalScore: number; isPassed: boolean; resultText: string }) => {
    setSaveAlertMessage(`Marking Report Saved: ${summary.name} · Score: ${summary.totalScore}/60 (${summary.isPassed ? 'PASS' : 'FAIL'})`);
    setTimeout(() => {
      setSaveAlertMessage(null);
    }, 4500);
  };

  const currentDate = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const allModulesDone = Boolean(completedModules[1] && completedModules[2] && completedModules[3]);

  return (
    <div className="relative min-h-screen bg-[#F8F9FA] text-[#1E293B] flex flex-col font-sans">
      {/* Decorative CSS-based Barcode Pattern running down extreme left and right margins */}
      <div className="barcode-strip-left" aria-hidden="true" />
      <div className="barcode-strip-right" aria-hidden="true" />

      {/* Persistent Dark Maroon Top Banner & Security Header */}
      <TopBanner
        sessionID={sessionID}
        candidateName={candidateName}
        deploymentUrl={deploymentUrl}
        masterSeconds={masterSeconds}
        isMasterTimerRunning={isMasterTimerRunning}
        onToggleMasterTimer={() => setIsMasterTimerRunning(!isMasterTimerRunning)}
        onResetMasterTimer={() => {
          setIsMasterTimerRunning(false);
          setMasterSeconds(3600);
        }}
        onScrollToMarking={scrollToMarkingPanel}
        allModulesCompleted={allModulesDone}
      />

      {/* Floating Save Notification Alert */}
      {saveAlertMessage && (
        <div className="fixed top-20 right-8 z-50 bg-[#800000] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-bold animate-bounce no-print border border-white/20">
          <span className="text-emerald-300 text-sm">✓</span>
          <span>{saveAlertMessage}</span>
        </div>
      )}

      {/* Main Examination Page Layout */}
      <main className="flex-1 w-full max-w-[1720px] mx-auto flex flex-col relative z-10 px-3 md:px-6">
        {/* TOP SECTION: Candidate Examination Presentation View (Kept Exactly as Specified) */}
        <div className="w-full bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs my-4">
          <CandidateInterface
            candidateName={candidateName}
            candidateId={sessionID}
            deploymentUrl={deploymentUrl}
            onProceedToMarking={scrollToMarkingPanel}
            completedModules={completedModules}
            onToggleModuleComplete={handleToggleModuleComplete}
            onMarkAllComplete={handleMarkAllComplete}
          />
        </div>

        {/* BOTTOM SECTION: Advanced Instructor Live Marking Panel (Positioned at the Very End of the Webpage) */}
        <InstructorPanel
          candidateName={candidateName}
          onUpdateCandidateName={setCandidateName}
          assessments={assessments}
          onUpdateScore={handleUpdateScore}
          remarks={remarks}
          onUpdateRemarks={setRemarks}
          onSaveReport={handleSaveReport}
          onOpenCertificateModal={() => setIsReportModalOpen(true)}
        />
      </main>

      {/* Official Assessment Report Modal (Formatted to A4 Landscape Certificate) */}
      <AssessmentReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        candidateName={candidateName}
        sessionID={sessionID}
        deploymentUrl={deploymentUrl}
        assessments={assessments}
        totalScore={totalScore}
        maxScore={60}
        isPassed={isPassed}
        notes={remarks}
        examDate={currentDate}
      />
    </div>
  );
}
