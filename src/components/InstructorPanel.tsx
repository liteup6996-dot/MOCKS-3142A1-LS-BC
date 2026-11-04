import React from 'react';
import {
  Lock,
  User,
  CheckCircle2,
  XCircle,
  FileCheck2,
  MessageSquare,
  Award,
  ClipboardList,
  Check,
  TrendingUp,
  Headphones,
  Info
} from 'lucide-react';
import { SectionAssessment } from '../types';
import { LISTENING_QUICK_TAGS } from '../data/mockData';

interface InstructorPanelProps {
  candidateName: string;
  onUpdateCandidateName: (name: string) => void;
  assessments: SectionAssessment[];
  onUpdateScore: (
    sectionId: number,
    criterionId: 'key_info' | 'context' | 'specific_details' | 'comprehension',
    score: number
  ) => void;
  remarks: string;
  onUpdateRemarks: (notes: string) => void;
  onSaveReport: (reportSummary: {
    name: string;
    totalScore: number;
    maxScore: number;
    averageScore: number;
    isPassed: boolean;
    resultText: string;
  }) => void;
  onOpenCertificateModal?: () => void;
}

export const InstructorPanel: React.FC<InstructorPanelProps> = ({
  candidateName,
  onUpdateCandidateName,
  assessments,
  onUpdateScore,
  remarks,
  onUpdateRemarks,
  onSaveReport,
  onOpenCertificateModal,
}) => {
  // 4 sections x 4 criteria = 16 criteria total. Max score = 16 x 5 = 80 points.
  const totalCriteriaCount = assessments.reduce((acc, sec) => acc + sec.criteria.length, 0);
  const totalScore = assessments.reduce(
    (acc, sec) => acc + sec.criteria.reduce((cAcc, curr) => cAcc + curr.score, 0),
    0
  );
  const maxScore = totalCriteriaCount * 5; // 80 points
  const averageScore = totalCriteriaCount > 0 ? parseFloat((totalScore / totalCriteriaCount).toFixed(2)) : 0;
  const percentage = Math.round((totalScore / maxScore) * 100);

  // Auto Pass/Fail Logic: Any average score >= 3.5 out of 5.0 is PASS
  const isPassed = averageScore >= 3.5;

  const handleInsertTag = (tag: string) => {
    const timeStamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const tagText = `[${timeStamp}] ${tag}\n`;
    onUpdateRemarks(remarks ? `${remarks}\n${tagText}` : tagText);
  };

  const handleSaveClick = () => {
    const candidate = candidateName.trim() || 'Miss Aamra';
    const resultText = isPassed
      ? 'Result: PASS (CEFR A1 / IELTS Band 2.0 - 2.5 Equivalent)'
      : 'Result: FAIL (Below A1 Standard)';

    // Trigger browser alert as explicitly requested
    const alertMessage = `----------------------------------------\nVOCAL VANTAGE | INSTRUCTOR MARKING PORTAL\n----------------------------------------\nCandidate Name: ${candidate}\nTotal Listening Score: ${totalScore} / ${maxScore}\nAverage Score: ${averageScore} / 5.00 (${percentage}%)\nPassing Criteria: Above 3.5 is PASS\nFinal Verdict: ${resultText}\n----------------------------------------`;

    try {
      if (typeof window !== 'undefined' && typeof window.alert === 'function') {
        window.alert(alertMessage);
      }
    } catch {
      console.log(alertMessage);
    }

    onSaveReport({
      name: candidate,
      totalScore,
      maxScore,
      averageScore,
      isPassed,
      resultText,
    });
  };

  return (
    <section
      id="instructor-marking-panel"
      className="w-full bg-[#FAFAFA] border-t-4 border-[#800000] text-slate-900 pt-8 pb-14 px-4 sm:px-6 lg:px-8 mt-12 scroll-mt-20"
      aria-label="Advanced Instructor Live Marking Portal"
    >
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Panel Section Header */}
        <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#800000]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-mono bg-[#800000]/10 text-[#800000] border border-[#800000]/20 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Lock className="w-3 h-3 text-[#800000]" />
                <span>Instructor Eyes Only</span>
              </span>
              <span className="text-slate-300">·</span>
              <span className="text-xs text-slate-500 font-semibold">
                Official IELTS Life Skills A1 Listening Assessment
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight flex items-center gap-3">
              <ClipboardList className="w-7 h-7 text-[#800000]" />
              <span>Instructor Marking Portal</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
              Real-time auto-calculating assessment form across Section 1, 2, 3, and 4. Select 1 to 5 for each listening comprehension criterion.
            </p>
          </div>

          {/* Quick Score Glance Widget */}
          <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-4 sm:p-5 flex items-center gap-4 shrink-0 shadow-2xs relative z-10">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                Live Total Score
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="font-mono text-3xl font-black text-[#800000]">
                  {totalScore}
                </span>
                <span className="font-mono text-sm font-bold text-slate-400">/ {maxScore}</span>
              </div>
              <div className="flex items-center gap-1.5 mt-0.5 font-mono text-xs">
                <span className="text-slate-700 font-bold">Avg: {averageScore} / 5.0</span>
                <span className="text-slate-400">·</span>
                <span className="text-slate-500">{percentage}%</span>
              </div>
            </div>
            <div className="h-12 w-px bg-slate-200" />
            <div className="text-right">
              <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">
                Status
              </span>
              <span
                className={`inline-block px-2.5 py-1 rounded-lg text-xs font-black tracking-wide font-mono mt-1 ${
                  isPassed
                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                    : 'bg-rose-100 text-rose-900 border border-rose-300'
                }`}
              >
                {isPassed ? 'PASS (≥ 3.5)' : 'FAIL (< 3.5)'}
              </span>
            </div>
          </div>
        </div>

        {/* Passing Criteria Banner explicitly placed above grading sections */}
        <div className="bg-emerald-50 border-2 border-emerald-400 rounded-2xl p-4 sm:p-5 shadow-2xs flex items-start sm:items-center gap-4 text-emerald-950">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
            <Info className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Official IELTS Life Skills A1 Listening Passing Criteria
            </div>
            <p className="text-xs sm:text-sm font-semibold text-emerald-950 mt-0.5 leading-relaxed">
              <strong>Passing Benchmark:</strong> Any overall average score <strong>above 3.5 / 5.0</strong> (≥ 70% or total score ≥ 56/80) is classified as an automated <strong>PASS</strong>. Candidate scores below 3.5 are classified as <strong>FAIL</strong> requiring re-take.
            </p>
          </div>
        </div>

        {/* 1. Candidate Details Section */}
        <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <User className="w-4 h-4 text-[#800000]" />
              <span>1. Candidate Details</span>
            </span>
            <span className="text-xs font-mono text-slate-400">
              Exam ID: <strong className="text-slate-700">VV-A1-13789JH</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
            <div className="sm:col-span-8">
              <label
                htmlFor="marking-candidate-name-input"
                className="block text-xs font-bold text-slate-700 mb-1"
              >
                Candidate Name:
              </label>
              <input
                id="marking-candidate-name-input"
                type="text"
                value={candidateName}
                onChange={(e) => onUpdateCandidateName(e.target.value)}
                placeholder="Enter candidate full name..."
                className="w-full px-4 py-2.5 text-sm font-bold text-slate-900 bg-slate-50 border-2 border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:border-[#800000] focus:ring-2 focus:ring-[#800000]/20 transition-all font-sans"
              />
            </div>

            <div className="sm:col-span-4 bg-slate-50 border border-slate-200 p-3 rounded-xl flex items-center justify-between text-xs">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                  Test Format
                </span>
                <span className="font-bold text-slate-800">Life Skills A1 Listening</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                  Automated Threshold
                </span>
                <span className="font-bold text-emerald-700 font-mono">≥ 3.5 Avg Score</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Section-Wise Grading Sections (Four Distinct Cards) */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Award className="w-5 h-5 text-[#800000]" />
                <span>2. Section-Wise Listening Assessment Matrix</span>
              </h3>
              <p className="text-xs text-slate-500">
                Four official listening criteria per section (Scale: 1 = Poor, 5 = Excellent). Click any tile to select and score in maroon.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500 font-semibold bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-2xs self-start sm:self-auto">
              <span>Max: 20 pts per section</span>
              <span>·</span>
              <span className="text-[#800000] font-bold">Overall: 80 pts</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {assessments.map((sec) => {
              const secScore = sec.criteria.reduce((acc, curr) => acc + curr.score, 0);
              const secAvg = (secScore / sec.criteria.length).toFixed(1);
              const secPercentage = Math.round((secScore / 20) * 100);

              return (
                <div
                  key={sec.sectionId}
                  className="bg-white border-2 border-slate-200 hover:border-[#800000]/40 transition-colors rounded-2xl p-6 shadow-2xs flex flex-col justify-between space-y-5"
                >
                  {/* Card Header */}
                  <div className="pb-3 border-b-2 border-slate-100">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[10px] font-mono font-extrabold uppercase tracking-wider text-[#800000] bg-[#800000]/10 px-2.5 py-0.5 rounded-full">
                        Section 0{sec.sectionId} Assessment
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-500">
                        Avg: {secAvg} / 5.0
                      </span>
                    </div>

                    <h4 className="text-base font-extrabold text-slate-950 leading-snug">
                      {sec.sectionTitle}
                    </h4>

                    {/* Section Score Counter */}
                    <div className="mt-3 bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        Section Score:
                      </span>
                      <div className="flex items-baseline gap-1 font-mono">
                        <span className="text-lg font-black text-[#800000]">{secScore}</span>
                        <span className="text-xs font-bold text-slate-400">/ 20</span>
                        <span className="text-[10px] text-slate-500 ml-1">({secPercentage}%)</span>
                      </div>
                    </div>
                  </div>

                  {/* 4 Official Listening Criteria */}
                  <div className="space-y-4 flex-1">
                    {sec.criteria.map((crit) => (
                      <div
                        key={crit.id}
                        className="p-3 bg-slate-50/80 border border-slate-200 rounded-xl space-y-2 hover:bg-slate-50 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="text-xs font-extrabold text-slate-900 leading-snug">
                              {crit.name}
                            </div>
                            <div className="text-[11px] text-slate-500 leading-tight mt-0.5">
                              {crit.subdesc}
                            </div>
                          </div>
                          <span className="text-xs font-mono font-bold text-[#800000] shrink-0 bg-white px-2 py-0.5 rounded border border-slate-200">
                            {crit.score} / 5
                          </span>
                        </div>

                        {/* 1 to 5 Selectable Scale Tiles */}
                        <div className="grid grid-cols-5 gap-1.5 pt-1">
                          {[1, 2, 3, 4, 5].map((val) => {
                            const isSelected = crit.score === val;
                            return (
                              <button
                                key={val}
                                type="button"
                                onClick={() => onUpdateScore(sec.sectionId, crit.id, val)}
                                className={`py-2 px-1 rounded-xl text-xs font-bold transition-all flex flex-col items-center justify-center cursor-pointer ${
                                  isSelected
                                    ? 'bg-[#800000] text-white shadow-sm ring-2 ring-[#800000]/30 scale-102 font-black'
                                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 hover:border-slate-300'
                                }`}
                                title={`Rate ${val}: ${val === 1 ? 'Poor' : val === 3 ? 'Satisfactory' : val === 5 ? 'Excellent' : 'Score ' + val}`}
                              >
                                <span className="font-mono text-sm leading-none">{val}</span>
                                <span className="text-[8px] opacity-75 font-normal mt-0.5">
                                  {val === 1 ? 'Poor' : val === 3 ? 'Sat' : val === 5 ? 'Exc' : ''}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Subtotal Mini Progress Bar */}
                  <div className="pt-2 border-t border-slate-100">
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-[#800000] h-full transition-all duration-300"
                        style={{ width: `${(secScore / 20) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Auto-Calculation Summary & Dynamic Pass/Fail Badge */}
        <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-[#800000]" />
              <span>3. Live Score Calculation & Automated CEFR A1 Band Mapping</span>
            </span>
            <span className="text-xs font-mono text-slate-400">
              Benchmark: Average &gt; 3.5 = PASS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Live Score Display */}
            <div className="md:col-span-5 bg-slate-50 border-2 border-slate-200 rounded-2xl p-5 flex flex-col justify-center">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                Live Cumulative Score
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-mono text-4xl sm:text-5xl font-black text-[#800000] tracking-tight">
                  Total Score: {totalScore}
                </span>
                <span className="font-mono text-xl sm:text-2xl font-bold text-slate-400">
                  / {maxScore}
                </span>
              </div>
              <div className="flex items-center gap-3 mt-2 text-xs font-mono">
                <span className="text-slate-800 font-bold bg-white px-2.5 py-1 rounded border border-slate-200">
                  Average: <strong>{averageScore}</strong> / 5.0
                </span>
                <span className="text-slate-500">
                  Percentage: <strong>{percentage}%</strong>
                </span>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <div className="flex-1 bg-slate-200 h-2.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      isPassed ? 'bg-emerald-600' : 'bg-[#800000]'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="font-mono text-xs font-bold text-slate-600 shrink-0">
                  {percentage}%
                </span>
              </div>
            </div>

            {/* Dynamic Pass/Fail Badge */}
            <div className="md:col-span-7">
              {isPassed ? (
                <div className="bg-emerald-50 border-3 border-emerald-500 rounded-2xl p-5 shadow-sm text-emerald-950 flex items-start sm:items-center gap-4 transition-all">
                  <div className="w-13 h-13 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold text-2xl shrink-0 shadow-xs">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-800">
                      Automated Assessment Verdict
                    </div>
                    <div className="text-lg sm:text-xl font-black text-emerald-950 tracking-tight leading-snug mt-0.5">
                      Result: PASS (CEFR A1 / IELTS Band 2.0 - 2.5 Equivalent)
                    </div>
                    <p className="text-xs text-emerald-900 font-medium mt-1 leading-relaxed">
                      Average score of <strong>{averageScore} / 5.0</strong> ({totalScore}/{maxScore}) exceeds the 3.5 benchmark. Candidate satisfies the English listening comprehension required for IELTS Life Skills A1.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-rose-50 border-3 border-rose-500 rounded-2xl p-5 shadow-sm text-rose-950 flex items-start sm:items-center gap-4 transition-all">
                  <div className="w-13 h-13 rounded-2xl bg-rose-700 text-white flex items-center justify-center font-bold text-2xl shrink-0 shadow-xs">
                    <XCircle className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[10px] font-extrabold uppercase tracking-widest text-rose-800">
                      Automated Assessment Verdict
                    </div>
                    <div className="text-lg sm:text-xl font-black text-rose-950 tracking-tight leading-snug mt-0.5">
                      Result: FAIL (Below A1 Standard)
                    </div>
                    <p className="text-xs text-rose-900 font-medium mt-1 leading-relaxed">
                      Average score of <strong>{averageScore} / 5.0</strong> ({totalScore}/{maxScore}) is below the mandatory 3.5 benchmark. Candidate requires additional listening drills to achieve A1 qualification.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 4. Notes & Export Section */}
        <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-[#800000]" />
              <span>4. Instructor Remarks & Live Feedback</span>
            </h3>
            <span className="text-xs font-mono text-slate-400">
              {remarks.length} characters
            </span>
          </div>

          {/* Quick Tags for Instant Annotation */}
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
              Listening Quick Observation Stamps:
            </span>
            <div className="flex flex-wrap gap-2">
              {LISTENING_QUICK_TAGS.map((tag, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleInsertTag(tag)}
                  className="text-xs bg-slate-100 hover:bg-[#800000] hover:text-white text-slate-700 px-3 py-1.5 rounded-xl font-semibold transition-all cursor-pointer border border-slate-200"
                >
                  +{tag}
                </button>
              ))}
            </div>
          </div>

          {/* Full-width <textarea> Labeled "Instructor Remarks" */}
          <div>
            <label
              htmlFor="instructor-remarks-textarea"
              className="block text-xs font-extrabold uppercase tracking-wider text-slate-800 mb-1.5"
            >
              Instructor Remarks:
            </label>
            <textarea
              id="instructor-remarks-textarea"
              rows={5}
              value={remarks}
              onChange={(e) => onUpdateRemarks(e.target.value)}
              placeholder="Record candidate listening comprehension strengths, numerical retention, timeline understanding, or areas for development during the session..."
              className="w-full text-xs sm:text-sm p-4 bg-slate-50 border-2 border-slate-300 rounded-2xl focus:bg-white focus:outline-hidden focus:border-[#800000] focus:ring-2 focus:ring-[#800000]/20 text-slate-900 font-mono leading-relaxed transition-all shadow-inner"
            />
          </div>

          {/* Actions: Large Maroon Primary Button "Save Marking Report" & View Certificate */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500 text-center sm:text-left">
              Saving triggers browser verification and compiles candidate's official IELTS Life Skills Listening report.
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              {onOpenCertificateModal && (
                <button
                  type="button"
                  onClick={onOpenCertificateModal}
                  className="w-full sm:w-auto px-5 py-3.5 bg-white border-2 border-slate-300 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
                >
                  <FileCheck2 className="w-4 h-4 text-[#800000]" />
                  <span>Preview A4 Landscape Certificate</span>
                </button>
              )}

              {/* Large Maroon Primary Button labeled "Save Marking Report" */}
              <button
                type="button"
                onClick={handleSaveClick}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#800000] hover:bg-[#660000] active:scale-98 text-white rounded-xl text-xs sm:text-sm font-extrabold uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Save Marking Report</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
