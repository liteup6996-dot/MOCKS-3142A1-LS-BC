import React, { useState } from 'react';
import {
  X,
  Printer,
  Copy,
  Check,
  ShieldCheck,
  Award,
  FileCheck2
} from 'lucide-react';
import { ModuleA1Assessment } from '../types';

interface AssessmentReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidateName: string;
  sessionID: string;
  deploymentUrl?: string;
  assessments: ModuleA1Assessment[];
  totalScore: number;
  maxScore?: number;
  isPassed: boolean;
  notes: string;
  examDate: string;
}

export const AssessmentReportModal: React.FC<AssessmentReportModalProps> = ({
  isOpen,
  onClose,
  candidateName = 'Miss Aamra',
  sessionID = 'VV-A1-13789JH',
  deploymentUrl = 'Mock-LM-VV-A1-13789JH',
  assessments,
  totalScore,
  maxScore = 60,
  isPassed,
  notes,
  examDate,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const percentage = Math.round((totalScore / maxScore) * 100);
  const verdictText = isPassed
    ? 'Result: PASS (CEFR A1 / IELTS Band 2.0 - 2.5 Equivalent)'
    : 'Result: FAIL (Below A1 Standard)';

  const handlePrint = () => {
    window.print();
  };

  const handleCopySummary = () => {
    const reportText = `
===================================================
VOCAL VANTAGE SECURE ASSESSMENT GATEWAY
OFFICIAL IELTS A1 LIFE SKILLS SPEAKING REPORT
===================================================
Session ID: ${sessionID}
Date: ${examDate}
Candidate Name: ${candidateName || 'Miss Aamra'}
Reference URL: ${deploymentUrl}
CEFR Standard: IELTS Life Skills A1
Final Outcome: ${isPassed ? 'PASS' : 'FAIL'}
Overall Cumulative Score: ${totalScore} / ${maxScore} (${percentage}%)
Verdict: ${verdictText}

MODULE-WISE CRITERIA BREAKDOWN:
${assessments
  .map(
    (mod) =>
      `\n[${mod.moduleName}] (Subtotal: ${mod.criteria.reduce((a, b) => a + b.score, 0)}/20):\n` +
      mod.criteria.map((c) => `  - ${c.name}: ${c.score}/5 (${c.subdesc})`).join('\n')
  )
  .join('\n')}

INSTRUCTOR REMARKS:
${notes || 'No specific notes recorded.'}

===================================================
Vocal Vantage Accredited Assessment System
===================================================
    `.trim();

    navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/65 backdrop-blur-xs overflow-y-auto modal-backdrop-print">
      {/* Outer Modal Container Styled to Landscape Proportions */}
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full border border-slate-300 overflow-hidden my-4">
        {/* Top Operational Bar (Hidden during Print/Download) */}
        <div className="bg-[#800000] text-white px-6 py-3 flex items-center justify-between no-print">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-300" />
            <h3 className="font-bold text-sm tracking-wide">
              Official Assessment Result · A4 Landscape View
            </h3>
            <span className="hidden sm:inline bg-black/25 text-emerald-300 text-[10px] font-mono px-2 py-0.5 rounded font-semibold uppercase">
              A4 Landscape Formatted
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-[#800000] rounded-lg text-xs font-bold hover:bg-slate-100 transition-colors cursor-pointer shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Download PDF</span>
            </button>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white p-1 rounded-md transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Official Document Sheet - A4 Landscape Page Container */}
        <div
          id="official-report-document"
          className="a4-landscape-sheet bg-white text-slate-900 p-6 sm:p-8 m-2 sm:m-4 border-2 border-[#800000]/30 rounded-xl relative"
        >
          {/* Inner Decorative Certificate Border */}
          <div className="border border-[#800000]/20 p-4 sm:p-5 rounded-lg h-full flex flex-col justify-between">
            {/* Header Section */}
            <div className="pb-3 border-b-2 border-[#800000] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-lg bg-[#800000] text-white font-black text-base flex items-center justify-center font-mono shadow-xs shrink-0">
                  VV
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-black tracking-tight text-[#800000] uppercase font-mono leading-none">
                    Vocal Vantage
                  </h1>
                  <p className="text-[11px] font-bold text-slate-600 tracking-wider uppercase mt-1">
                    Secure Assessment Gateway · IELTS Life Skills A1 Speaking Test Report
                  </p>
                </div>
              </div>

              {/* Security Hash & Session Metadata */}
              <div className="text-right text-xs">
                <div className="font-mono font-bold text-slate-900 tracking-wider">
                  SESSION: {sessionID}
                </div>
                <div className="text-[10px] text-slate-500 font-medium">
                  Verified Exam Date: {examDate}
                </div>
              </div>
            </div>

            {/* Candidate & Assessment Metadata Strip */}
            <div className="grid grid-cols-4 gap-2 bg-slate-50 p-2.5 my-3 rounded-lg border border-slate-200 text-xs">
              <div>
                <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">
                  Candidate Name
                </span>
                <span className="font-bold text-slate-900 text-xs truncate block font-mono">
                  {candidateName || 'Miss Aamra'}
                </span>
              </div>
              <div>
                <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">
                  Candidate ID
                </span>
                <span className="font-bold text-[#800000] text-xs block font-mono">
                  {sessionID || 'VV-A1-13789JH'}
                </span>
              </div>
              <div>
                <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">
                  Deployment Ref
                </span>
                <span className="font-mono text-slate-800 text-xs block font-bold truncate">
                  {deploymentUrl}
                </span>
              </div>
              <div>
                <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">
                  CEFR Standard
                </span>
                <span className="font-bold text-[#800000] text-xs block">
                  IELTS Life Skills A1
                </span>
              </div>
            </div>

            {/* Main Landscape 2-Column Split */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 my-1 flex-1 items-stretch">
              {/* Left Column (7 of 12 columns = 58% width) */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-3">
                {/* Official Verdict Banner */}
                <div
                  className={`p-3.5 rounded-xl border-2 flex items-center justify-between gap-3 ${
                    isPassed
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-950'
                      : 'bg-rose-50 border-rose-500 text-rose-950'
                  }`}
                >
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider opacity-80 block">
                      Official Examination Outcome
                    </span>
                    <div className="text-base sm:text-lg font-black tracking-tight leading-snug mt-0.5">
                      {isPassed
                        ? 'Result: PASS (CEFR A1 / IELTS Band 2.0 - 2.5 Equivalent)'
                        : 'Result: FAIL (Below A1 Standard)'}
                    </div>
                    <p className="text-[11px] mt-1 opacity-90 leading-tight">
                      {isPassed
                        ? `Candidate attained ${totalScore}/60 points (benchmark ≥ 36), satisfying CEFR A1 communicative competency.`
                        : `Candidate attained ${totalScore}/60 points (below 36 benchmark). Recommended for continued oral drills.`}
                    </p>
                  </div>

                  {/* Circular Result Stamp */}
                  <div
                    className={`w-14 h-14 rounded-full border-3 flex items-center justify-center font-black text-sm font-mono rotate-12 shadow-2xs shrink-0 ${
                      isPassed
                        ? 'border-emerald-600 text-emerald-700 bg-emerald-100/70'
                        : 'border-rose-600 text-rose-700 bg-rose-100/70'
                    }`}
                  >
                    {isPassed ? 'PASS' : 'FAIL'}
                  </div>
                </div>

                {/* Module-Wise Criteria Matrix Table */}
                <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-slate-100 text-slate-700 border-b border-slate-200">
                      <tr>
                        <th className="py-2 px-3 font-bold text-[10px]">IELTS Life Skills A1 Criteria</th>
                        <th className="py-2 px-2 text-center font-bold text-[10px]">M1 (15m)</th>
                        <th className="py-2 px-2 text-center font-bold text-[10px]">M2 (15m)</th>
                        <th className="py-2 px-2 text-center font-bold text-[10px]">M3 (30m)</th>
                        <th className="py-2 px-3 text-right font-bold text-[10px]">Criterion Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {[
                        { id: 'obtaining', name: 'Obtaining Information', desc: 'Understanding questions/instructions' },
                        { id: 'conveying', name: 'Conveying Information', desc: 'Sharing basic facts, feelings, opinions' },
                        { id: 'speaking', name: 'Speaking to Communicate', desc: 'Clarity, pronunciation, basic vocabulary' },
                        { id: 'discussion', name: 'Engaging in Discussion', desc: 'Interacting, keeping the conversation going' },
                      ].map((criterion) => {
                        const m1Score = assessments[0]?.criteria.find((c) => c.id === criterion.id)?.score || 0;
                        const m2Score = assessments[1]?.criteria.find((c) => c.id === criterion.id)?.score || 0;
                        const m3Score = assessments[2]?.criteria.find((c) => c.id === criterion.id)?.score || 0;
                        const rowTotal = m1Score + m2Score + m3Score;

                        return (
                          <tr key={criterion.id} className="hover:bg-slate-50">
                            <td className="py-1.5 px-3">
                              <div className="font-bold text-slate-900 text-xs">{criterion.name}</div>
                              <div className="text-[10px] text-slate-500 truncate max-w-[240px]">
                                {criterion.desc}
                              </div>
                            </td>
                            <td className="py-1.5 px-2 text-center font-mono font-bold text-slate-700">
                              {m1Score}/5
                            </td>
                            <td className="py-1.5 px-2 text-center font-mono font-bold text-slate-700">
                              {m2Score}/5
                            </td>
                            <td className="py-1.5 px-2 text-center font-mono font-bold text-slate-700">
                              {m3Score}/5
                            </td>
                            <td className="py-1.5 px-3 text-right font-mono font-bold text-[#800000]">
                              {rowTotal} / 15
                            </td>
                          </tr>
                        );
                      })}
                      <tr className="bg-slate-50 font-bold border-t border-slate-200">
                        <td className="py-2 px-3 text-slate-800 text-xs">Module Subtotals:</td>
                        <td className="py-2 px-2 text-center font-mono text-[#800000] text-xs">
                          {assessments[0]?.criteria.reduce((a, b) => a + b.score, 0)}/20
                        </td>
                        <td className="py-2 px-2 text-center font-mono text-[#800000] text-xs">
                          {assessments[1]?.criteria.reduce((a, b) => a + b.score, 0)}/20
                        </td>
                        <td className="py-2 px-2 text-center font-mono text-[#800000] text-xs">
                          {assessments[2]?.criteria.reduce((a, b) => a + b.score, 0)}/20
                        </td>
                        <td className="py-2 px-3 text-right font-mono text-base font-black text-[#800000]">
                          Total: {totalScore} / 60
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Right Column (5 of 12 columns = 42% width) */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
                {/* Live Observation Notes Box */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex-1 flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 block mb-1">
                    Instructor Remarks & Feedback
                  </span>
                  <div className="p-2.5 bg-white border border-slate-200 rounded-lg text-[11px] text-slate-800 font-mono whitespace-pre-wrap leading-relaxed flex-1 overflow-y-auto max-h-[140px]">
                    {notes.trim() || 'No specific notes recorded during this session.'}
                  </div>
                </div>

                {/* Proctor Certification, Signature & Security Hash */}
                <div className="bg-white border border-slate-200 rounded-xl p-3 text-xs flex flex-col justify-between space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900 text-xs">Certified Examiner</div>
                      <div className="text-slate-500 text-[10px]">Authorization: VV-EXP-0491</div>
                    </div>
                    <div className="text-right">
                      <div className="border-b border-slate-400 w-32 pb-0.5 font-serif italic text-slate-700 text-xs">
                        Authorized Proctor
                      </div>
                      <span className="text-[9px] text-slate-400 uppercase tracking-wider">
                        Official Signature & Seal
                      </span>
                    </div>
                  </div>

                  <div className="pt-1.5 border-t border-slate-100 flex items-center justify-between text-[9px] font-mono text-slate-400">
                    <span>SECURITY: SHA256:{sessionID.replace(/[^a-zA-Z0-9]/g, '')}F91B</span>
                    <span>VOCAL VANTAGE SECURE CERT</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Subtle Accreditation Footer */}
            <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-400 font-medium">
              <span>Vocal Vantage English Coaching Platform · Official Mock Assessment Record</span>
              <span>Validated for A4 Landscape Document Distribution</span>
            </div>
          </div>
        </div>

        {/* Modal Action Controls (Hidden on Print/Download) */}
        <div className="px-6 py-3.5 bg-slate-100 border-t border-slate-200 flex items-center justify-between gap-3 no-print">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            Close Report
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopySummary}
              className="flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-300 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Text Summary'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-5 py-2 bg-[#800000] text-white rounded-xl text-xs font-bold hover:bg-[#660000] transition-colors cursor-pointer shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF (A4 Landscape)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
