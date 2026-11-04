/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TopBanner } from './components/TopBanner';
import { CandidateInterface } from './components/CandidateInterface';
import { InstructorPanel } from './components/InstructorPanel';
import { AssessmentReportModal } from './components/AssessmentReportModal';
import { SectionAssessment } from './types';
import { INITIAL_SECTION_ASSESSMENTS } from './data/mockData';

export default function App() {
  // Fixed Candidate ID & Deployment URL Identifier as requested
  const [sessionID] = useState('VV-A1-13789JH');
  const [candidateName, setCandidateName] = useState('Miss Aamra');
  const [deploymentUrl] = useState('Mock-LM-VV-A1-13789JH');

  // Overall 1 Main Session Timer (1 Hour = 60:00 = 3600 seconds)
  const [masterSeconds, setMasterSeconds] = useState(3600);
  const [isMasterTimerRunning, setIsMasterTimerRunning] = useState(false);

  // Candidate Answer Responses for the Listening Questions across Sections 1 to 4 (Empty for student input)
  const [candidateAnswers, setCandidateAnswers] = useState<Record<string, string>>({});

  // Assessment Report Modal Open State
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  // Save Notification Banner
  const [saveAlertMessage, setSaveAlertMessage] = useState<string | null>(null);

  // Section-Wise Listening Assessments (Section 1, 2, 3, 4 with 4 criteria each)
  const [assessments, setAssessments] = useState<SectionAssessment[]>(INITIAL_SECTION_ASSESSMENTS);

  // Instructor Remarks
  const [remarks, setRemarks] = useState(
    `[09:05] Section 1: Successfully identified bedroom numbers, family relocation reason, and routine visit times.\n[09:18] Section 2: Accurately captured appointment time (10:30 AM) and surname spelling.\n[09:32] Section 3: Accurately identified rent estimate (£650), bedroom requirements, bus distance, and children play areas.\n[09:48] Section 4: Accurately extracted flood causes (heavy river rainfall), avoided travel zones, emergency shelter venue, and the 3 relief donation items.`
  );

  // Sync browser URL bar with the mock deployment route on mount
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && (window.location.pathname === '/' || window.location.pathname === '')) {
        window.history.replaceState(null, '', `/${deploymentUrl}`);
      }
    } catch {
      // Ignore in restricted iframe environments
    }
  }, [deploymentUrl]);

  // Master Session Clock Ticker (60 Minutes)
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

  const scrollToMarkingPanel = () => {
    const el = document.getElementById('instructor-marking-panel');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleUpdateAnswer = (questionId: string, answer: string) => {
    setCandidateAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  // Real-time calculation whenever any 1-5 button is clicked in the Instructor Marking Portal
  const handleUpdateScore = (
    sectionId: number,
    criterionId: 'key_info' | 'context' | 'specific_details' | 'comprehension',
    score: number
  ) => {
    setAssessments((prev) =>
      prev.map((sec) => {
        if (sec.sectionId !== sectionId) return sec;
        return {
          ...sec,
          criteria: sec.criteria.map((c) => (c.id === criterionId ? { ...c, score } : c)),
        };
      })
    );
  };

  // Total and Average Calculations
  const totalCriteriaCount = assessments.reduce((acc, sec) => acc + sec.criteria.length, 0);
  const totalScore = assessments.reduce(
    (acc, sec) => acc + sec.criteria.reduce((cAcc, curr) => cAcc + curr.score, 0),
    0
  );
  const maxScore = totalCriteriaCount * 5; // 80 points
  const averageScore = totalCriteriaCount > 0 ? parseFloat((totalScore / totalCriteriaCount).toFixed(2)) : 0;
  // PASS criteria: above 3.5 (average >= 3.5 out of 5)
  const isPassed = averageScore >= 3.5;

  const handleSaveReport = (summary: {
    name: string;
    totalScore: number;
    maxScore: number;
    averageScore: number;
    isPassed: boolean;
    resultText: string;
  }) => {
    setSaveAlertMessage(
      `Marking Report Saved: ${summary.name} · Score: ${summary.totalScore}/${summary.maxScore} (Avg ${summary.averageScore}/5.0 - ${summary.isPassed ? 'PASS' : 'FAIL'})`
    );
    setTimeout(() => {
      setSaveAlertMessage(null);
    }, 4500);
  };

  const currentDate = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

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
      />

      {/* Floating Save Notification Alert */}
      {saveAlertMessage && (
        <div className="fixed top-20 right-8 z-50 bg-[#800000] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-bold animate-bounce no-print border border-white/20">
          <span className="text-emerald-300 text-sm">✓</span>
          <span>{saveAlertMessage}</span>
        </div>
      )}

      {/* Main Single Page: All 4 Sections followed by Instructor Marking Portal at the end */}
      <main className="flex-1 w-full max-w-[1720px] mx-auto flex flex-col relative z-10 px-3 md:px-6">
        {/* 1 SINGLE MAIN PAGE: Candidate Listening Paper with Section 1, 2, 3, 4 stacked directly */}
        <div className="w-full bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-2xs my-4">
          <CandidateInterface
            candidateName={candidateName}
            candidateId={sessionID}
            deploymentUrl={deploymentUrl}
            candidateAnswers={candidateAnswers}
            onUpdateAnswer={handleUpdateAnswer}
            onProceedToMarking={scrollToMarkingPanel}
          />
        </div>

        {/* BOTTOM SECTION: Advanced Instructor Live Marking Portal (Positioned at the Very End of the Webpage) */}
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
        maxScore={maxScore}
        averageScore={averageScore}
        isPassed={isPassed}
        notes={remarks}
        examDate={currentDate}
      />
    </div>
  );
}
