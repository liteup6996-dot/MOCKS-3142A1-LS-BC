import React from 'react';
import {
  Headphones,
  CheckCircle2,
  FileAudio,
  User,
  ArrowDownCircle,
  HelpCircle,
  Hash
} from 'lucide-react';
import { LISTENING_SECTIONS } from '../data/mockData';
import { AudioPlayer } from './AudioPlayer';

interface CandidateInterfaceProps {
  candidateName: string;
  candidateId?: string;
  deploymentUrl?: string;
  candidateAnswers: Record<string, string>;
  onUpdateAnswer: (questionId: string, answer: string) => void;
  onProceedToMarking: () => void;
}

export const CandidateInterface: React.FC<CandidateInterfaceProps> = ({
  candidateName = 'Miss Aamra',
  candidateId = 'VV-A1-13789JH',
  deploymentUrl = 'Mock-LM-VV-A1-13789JH',
  candidateAnswers,
  onUpdateAnswer,
  onProceedToMarking,
}) => {
  const totalQuestions = LISTENING_SECTIONS.reduce((acc, s) => acc + s.questions.length, 0);
  const answeredCount = Object.values(candidateAnswers).filter((ans) => ans.trim().length > 0).length;

  const scrollToSection = (sectionId: number) => {
    const el = document.getElementById(`section-${sectionId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-white flex flex-col">
      {/* Presentation Header Bar */}
      <div className="p-6 border-b border-slate-200 bg-[#FCFCFD]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[11px] font-bold text-[#800000] tracking-wider uppercase flex items-center gap-1.5">
                <Headphones className="w-4 h-4 text-[#800000]" />
                <span>IELTS Life Skills A1 · Listening Assessment</span>
              </span>
              <span className="text-slate-300">·</span>
              <span className="text-xs text-slate-500 font-medium">Single Main Examination Page</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Official Listening Comprehension Paper
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
              Listen to all 4 audio recordings using the timeline scrubber to navigate, rewind, or replay. Answer the 25 official listening questions below each recording.
            </p>
          </div>

          {/* Candidate Identifier Badge */}
          <div className="bg-white border-2 border-slate-200 px-4 py-3 rounded-2xl shadow-2xs flex items-center gap-3 shrink-0">
            <div className="w-11 h-11 rounded-full bg-[#800000]/10 text-[#800000] flex items-center justify-center font-bold text-sm shrink-0">
              <User className="w-5 h-5 text-[#800000]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Candidate</span>
                <span className="text-[11px] font-mono font-bold bg-[#800000]/10 text-[#800000] px-2 py-0.5 rounded">
                  {candidateId}
                </span>
              </div>
              <div className="text-base font-extrabold text-slate-900 font-mono leading-tight mt-0.5">
                {candidateName.trim() || 'Miss Aamra'}
              </div>
              <div className="text-[10px] font-mono text-slate-500 mt-0.5">
                Ref: <span className="text-slate-800 font-semibold">{deploymentUrl}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Quick-Jump Navigation Strip */}
      <div className="px-6 py-3 border-b border-slate-200 bg-white sticky top-0 z-20 shadow-xs">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mr-1 hidden sm:inline">
              Sections:
            </span>
            {LISTENING_SECTIONS.map((sec) => {
              const secAnswered = sec.questions.filter((q) => candidateAnswers[q.id]?.trim().length > 0).length;
              return (
                <button
                  key={sec.id}
                  onClick={() => scrollToSection(sec.id)}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-[#800000] hover:text-white text-slate-700 text-xs font-bold transition-all border border-slate-200 cursor-pointer flex items-center gap-1.5"
                >
                  <span>Sec {sec.id}</span>
                  <span className="text-[10px] opacity-75 font-mono">
                    ({secAnswered}/{sec.questions.length})
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Answered: <strong>{answeredCount}</strong> / {totalQuestions}</span>
            </div>

            <button
              onClick={onProceedToMarking}
              className="px-3.5 py-1.5 bg-[#800000] hover:bg-[#660000] text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <span>Instructor Portal</span>
              <ArrowDownCircle className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Single Page: All 4 Sections Stacked Beautifully */}
      <div className="p-6 sm:p-8 max-w-6xl mx-auto w-full space-y-12">
        {LISTENING_SECTIONS.map((section) => (
          <article
            key={section.id}
            id={`section-${section.id}`}
            className="bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs scroll-mt-20 space-y-6"
          >
            {/* Section Header with Topic and File Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-wider text-[#800000] bg-[#800000]/10 px-3 py-0.5 rounded-full">
                    {section.title}
                  </span>
                  <span className="text-slate-300">·</span>
                  <span className="text-xs font-mono font-semibold text-slate-500">
                    {section.questions.length} Questions
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-950 mt-1">
                  {section.topic}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed max-w-2xl">
                  {section.description}
                </p>
              </div>

              {/* Recording File Badge */}
              <div className="bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-xl text-right self-start sm:self-auto shrink-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Recording File
                </span>
                <span className="text-xs font-mono font-bold text-[#800000] flex items-center gap-1 mt-0.5">
                  <FileAudio className="w-3.5 h-3.5" />
                  <span>{section.audioFilename}</span>
                </span>
              </div>
            </div>

            {/* Custom Interactive Audio Player with Timeline Scrubber */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                <span className="flex items-center gap-1.5 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                  <Headphones className="w-3.5 h-3.5 text-[#800000]" />
                  <span>Audio Player & Timeline Scrubber</span>
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  Use slider to seek forward/backward
                </span>
              </div>

              <AudioPlayer
                audioSrc={section.audioPath}
                filename={section.audioFilename}
                recordingRef={section.recordingFileRef}
                sectionNumber={section.id}
              />
            </div>

            {/* Questions List for this Section */}
            <div className="pt-4 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-[#800000]" />
                  <span>Section {section.id} Questions ({section.questions.length})</span>
                </h3>
                <span className="text-xs font-medium text-slate-400">
                  Listen carefully and type candidate answer below
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {section.questions.map((q, idx) => {
                  const currentAnswer = candidateAnswers[q.id] || '';
                  const hasAnswer = currentAnswer.trim().length > 0;

                  return (
                    <div
                      key={q.id}
                      className={`bg-slate-50/80 hover:bg-slate-50 border-2 rounded-2xl p-5 transition-all space-y-3 ${
                        hasAnswer
                          ? 'border-emerald-300 bg-emerald-50/20'
                          : 'border-slate-200'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <span className="w-8 h-8 rounded-xl bg-[#800000] text-white font-mono font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
                            {q.number}
                          </span>
                          <div>
                            <p className="text-base font-bold text-slate-900 leading-snug">
                              {q.question}
                            </p>
                            {q.targetFocus && (
                              <p className="text-xs text-slate-500 mt-0.5 font-medium">
                                Listening Focus: {q.targetFocus}
                              </p>
                            )}
                          </div>
                        </div>

                        {hasAnswer ? (
                          <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md shrink-0">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Recorded</span>
                          </span>
                        ) : (
                          <span className="text-[11px] font-mono text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200 shrink-0">
                            Pending
                          </span>
                        )}
                      </div>

                      {/* Candidate Answer Input */}
                      <div>
                        <input
                          type="text"
                          value={currentAnswer}
                          onChange={(e) => onUpdateAnswer(q.id, e.target.value)}
                          placeholder="Type candidate response here..."
                          className="w-full text-sm font-semibold px-4 py-2.5 bg-white border-2 border-slate-300 rounded-xl focus:outline-hidden focus:border-[#800000] focus:ring-2 focus:ring-[#800000]/20 text-slate-900 transition-all placeholder:text-slate-400"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </article>
        ))}

        {/* End of Test Completion Notice & Transition to Instructor Portal */}
        <div className="bg-[#fdf2f2] border-2 border-[#fca5a5] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#800000] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#800000]" />
              <span>All 4 Listening Sections Completed</span>
            </span>
            <h3 className="text-xl font-bold text-slate-900 mt-1">
              Proceed to Instructor Marking Portal
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
              All 25 questions across Section 1, 2, 3, and 4 are logged. Proceed to the Advanced Instructor Marking Portal below to evaluate candidate performance on the 1 to 5 criteria scale.
            </p>
          </div>

          <button
            onClick={onProceedToMarking}
            className="w-full md:w-auto px-7 py-4 bg-[#800000] hover:bg-[#660000] text-white rounded-xl text-xs sm:text-sm font-extrabold uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg transition-all cursor-pointer whitespace-nowrap"
          >
            <span>Proceed to Instructor Marking Portal ↓</span>
            <ArrowDownCircle className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
