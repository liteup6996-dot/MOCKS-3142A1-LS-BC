import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle,
  ArrowRight,
  Compass,
  User,
  MessageSquare,
  Clock,
  ClipboardCheck
} from 'lucide-react';
import {
  EXAM_MODULES,
  MODULE_1_QUESTIONS,
  MODULE_2_DATA,
  MODULE_3_DATA
} from '../data/mockData';

interface CandidateInterfaceProps {
  candidateName: string;
  candidateId?: string;
  deploymentUrl?: string;
  onProceedToMarking: () => void;
  completedModules: Record<number, boolean>;
  onToggleModuleComplete: (modId: number) => void;
  onMarkAllComplete: () => void;
}

export const CandidateInterface: React.FC<CandidateInterfaceProps> = ({
  candidateName,
  candidateId = 'VV-A1-13789JH',
  deploymentUrl = 'Mock-LM-VV-A1-13789JH',
  onProceedToMarking,
  completedModules,
  onToggleModuleComplete,
  onMarkAllComplete,
}) => {
  const [activeModule, setActiveModule] = useState<number>(1);

  return (
    <div className="w-full bg-white flex flex-col min-h-full">
      {/* Presentation Header Bar (Screen-Share Clean Aesthetic) */}
      <div className="p-6 border-b border-slate-200 bg-[#FCFCFD]">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold text-[#720000] tracking-wider uppercase">
                IELTS A1 Life Skills Mock Exam
              </span>
              <span className="text-slate-300">·</span>
              <span className="text-xs text-slate-500 font-medium">Live Oral Speaking Session</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Candidate Speaking Prompts
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Screen-share presentation view. Read prompts aloud and speak directly with the examiner.
            </p>
          </div>

          {/* Candidate Identifier Badge with Fixed ID & Deployment URL */}
          <div className="bg-white border border-slate-200 px-4 py-2.5 rounded-xl shadow-2xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#720000]/10 text-[#720000] flex items-center justify-center font-bold text-sm shrink-0">
              <User className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Candidate</span>
                <span className="text-[10px] font-mono font-bold bg-[#720000]/10 text-[#720000] px-1.5 py-0.2 rounded">
                  {candidateId}
                </span>
              </div>
              <div className="text-base font-bold text-slate-900 font-mono leading-tight">
                {candidateName.trim() || 'Miss Aamra'}
              </div>
              <div className="text-[10px] font-mono text-slate-500 mt-0.5">
                Ref: <span className="text-slate-700 font-semibold">{deploymentUrl}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Module Navigation Tabs */}
      <div className="px-6 border-b border-slate-200 bg-white sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-2 overflow-x-auto scrollbar-none py-3">
          <div className="flex items-center gap-2">
            {EXAM_MODULES.map((mod) => {
              const isActive = activeModule === mod.id;
              const isCompleted = completedModules[mod.id];

              return (
                <button
                  key={mod.id}
                  onClick={() => setActiveModule(mod.id)}
                  className={`flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-[#720000] text-white shadow-xs'
                      : 'bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <span className="font-bold">Module {mod.id}:</span>
                  <span>{mod.title.split(':')[1]?.trim() || mod.title}</span>
                  <span
                    className={`px-2 py-0.5 rounded-md text-[10px] font-mono ${
                      isActive ? 'bg-white/20 text-white font-bold' : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {mod.durationLabel}
                  </span>
                  {isCompleted && (
                    <CheckCircle className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-emerald-600'}`} />
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Step to Marking when available */}
          {completedModules[1] && completedModules[2] && completedModules[3] && (
            <button
              onClick={onProceedToMarking}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer whitespace-nowrap"
            >
              <ClipboardCheck className="w-3.5 h-3.5" />
              <span>Go to Instructor Marking Portal</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Module Content Area */}
      <div className="p-6 max-w-4xl mx-auto w-full flex-1">
        {/* ===================== MODULE 1 ===================== */}
        {activeModule === 1 && (
          <div className="space-y-6">
            {/* Clear Section Header with Allocated Time Prominently on Top */}
            <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4 shadow-2xs">
              <div>
                <span className="text-xs font-bold text-[#720000] uppercase tracking-wider">
                  Test Module 01 · Speaking Drills
                </span>
                <h2 className="text-xl font-bold text-slate-900 mt-1">
                  Personal Identification & Daily Life
                </h2>
                <p className="text-xs text-slate-500 mt-1 max-w-lg">
                  Answer the examiner's questions using clear vocabulary and full sentences.
                </p>
              </div>

              {/* Prominent Allocated Time Display */}
              <div className="bg-[#720000] text-white px-4 py-2.5 rounded-xl shadow-xs text-center min-w-[140px]">
                <span className="text-[10px] uppercase font-bold text-emerald-200 block tracking-wider">
                  Allocated Time
                </span>
                <span className="font-mono text-xl font-extrabold tracking-tight">
                  15 Minutes
                </span>
              </div>
            </div>

            {/* Questions Display (Large, high-contrast, distraction-free cards) */}
            <div className="space-y-4">
              {MODULE_1_QUESTIONS.map((q) => (
                <div
                  key={q.id}
                  className="bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-2xs hover:border-[#720000]/40 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <span className="w-9 h-9 rounded-xl bg-[#720000]/10 text-[#720000] font-mono font-bold text-sm flex items-center justify-center shrink-0">
                      {q.number}
                    </span>
                    <div className="flex-1">
                      <p className="text-lg font-bold text-slate-900 leading-snug">
                        "{q.question}"
                      </p>
                      <p className="text-xs text-slate-500 mt-2 font-medium">
                        Focus: {q.examinerNote}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Progression Bar */}
            <div className="pt-4 flex items-center justify-between border-t border-slate-200">
              <button
                onClick={() => onToggleModuleComplete(1)}
                className={`text-xs font-semibold px-4 py-2 rounded-xl border transition-colors cursor-pointer ${
                  completedModules[1]
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                    : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                }`}
              >
                {completedModules[1] ? 'Module 1 Marked Completed ✓' : 'Mark Module 1 Completed'}
              </button>

              <button
                onClick={() => {
                  onToggleModuleComplete(1);
                  setActiveModule(2);
                }}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#720000] text-white rounded-xl text-xs font-bold hover:bg-[#5a0000] transition-colors cursor-pointer shadow-xs"
              >
                <span>Proceed to Module 2</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ===================== MODULE 2 ===================== */}
        {activeModule === 2 && (
          <div className="space-y-6">
            {/* Clear Section Header with Allocated Time Prominently on Top */}
            <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4 shadow-2xs">
              <div>
                <span className="text-xs font-bold text-[#720000] uppercase tracking-wider">
                  Test Module 02 · Interactive Roleplay & Discussion
                </span>
                <h2 className="text-xl font-bold text-slate-900 mt-1">
                  Eliciting Information & Weekend Exchange
                </h2>
                <p className="text-xs text-slate-500 mt-1 max-w-lg">
                  Subsection A involves asking neighbor questions; Subsection B is a 5–7 min discussion on weekend habits.
                </p>
              </div>

              {/* Prominent Allocated Time Display */}
              <div className="bg-[#720000] text-white px-4 py-2.5 rounded-xl shadow-xs text-center min-w-[140px]">
                <span className="text-[10px] uppercase font-bold text-emerald-200 block tracking-wider">
                  Allocated Time
                </span>
                <span className="font-mono text-xl font-extrabold tracking-tight">
                  15 Minutes
                </span>
              </div>
            </div>

            {/* Subsection A: Candidate Task Prompt (Neighbor Roleplay) */}
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-2xs space-y-4">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#720000] uppercase tracking-wider">
                  <Compass className="w-4 h-4" />
                  <span>Subsection A: Neighbor Roleplay (Asking Questions)</span>
                </div>
                <span className="text-[11px] font-mono bg-[#720000]/10 text-[#720000] px-2.5 py-0.5 rounded-md font-bold">
                  Role: Neighbor
                </span>
              </div>

              {/* Task Prompt */}
              <div className="bg-[#fdf2f2] border-2 border-[#fca5a5] p-5 rounded-xl text-slate-950 font-bold text-lg leading-relaxed">
                "{MODULE_2_DATA.candidateTaskPrompt}"
              </div>

              {/* Simple Visual Question Cue Words */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2.5">
                  Question Starter Cues (Ask your neighbor about the area):
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {MODULE_2_DATA.promptCues.map((cue, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl"
                    >
                      <div className="text-sm font-bold text-[#720000]">{cue.word} ...?</div>
                      <div className="text-xs text-slate-500 mt-0.5">{cue.hint}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sample Neighbor Questions Reference */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">
                  Sample Questions a Neighbor Would Ask:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-slate-800">
                  {MODULE_2_DATA.sampleNeighborQuestions.map((sq, i) => (
                    <div key={i} className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-slate-200">
                      <span className="text-[#720000] font-bold">•</span>
                      <span>"{sq}"</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Subsection B: 5-7 Minute Conversational Topic & Green Guidance Notice */}
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-2xs space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[#720000] uppercase tracking-wider">
                <MessageSquare className="w-4 h-4" />
                <span>Subsection B: Interactive Conversation (5–7 Minutes)</span>
              </div>

              {/* Topic Statement for Discussion */}
              <div className="bg-slate-50 border-2 border-slate-300 p-5 rounded-xl">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                  Conversation Topic Statement:
                </span>
                <p className="text-lg font-bold text-slate-900 leading-snug">
                  "{MODULE_2_DATA.subsectionBTopic}"
                </p>
              </div>

              {/* Green Notice Box */}
              <div className="bg-emerald-50 border-2 border-emerald-400 p-4 rounded-xl flex items-start gap-3 text-emerald-950 shadow-2xs">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                    5–7 Minute Continuous Conversation (Subsection B Focus)
                  </div>
                  <p className="text-sm font-semibold text-emerald-900 mt-1 leading-relaxed">
                    A 5–7 minute continuous interactive conversation is to be carried out in Subsection B on this topic — converse about personal preferences, relaxing at home vs going out, and weekend activities naturally rather than just answering isolated questions.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Navigation */}
            <div className="pt-4 flex items-center justify-between border-t border-slate-200">
              <button
                onClick={() => setActiveModule(1)}
                className="text-xs text-slate-600 hover:text-slate-900 font-semibold cursor-pointer"
              >
                ← Back to Module 1
              </button>
              <button
                onClick={() => {
                  onToggleModuleComplete(2);
                  setActiveModule(3);
                }}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#720000] text-white rounded-xl text-xs font-bold hover:bg-[#5a0000] transition-colors cursor-pointer shadow-xs"
              >
                <span>Proceed to Module 3</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ===================== MODULE 3 ===================== */}
        {activeModule === 3 && (
          <div className="space-y-6">
            {/* Clear Section Header with Allocated Time Prominently on Top */}
            <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4 shadow-2xs">
              <div>
                <span className="text-xs font-bold text-[#720000] uppercase tracking-wider">
                  Test Module 03 · Final Conversational Drill
                </span>
                <h2 className="text-xl font-bold text-slate-900 mt-1">
                  Extended Interactive Discussion
                </h2>
                <p className="text-xs text-slate-500 mt-1 max-w-lg">
                  Final conversational exchange. Speak freely with the examiner about habits, opinions, and personal thoughts.
                </p>
              </div>

              {/* Prominent Allocated Time Display */}
              <div className="bg-[#720000] text-white px-4 py-2.5 rounded-xl shadow-xs text-center min-w-[140px]">
                <span className="text-[10px] uppercase font-bold text-emerald-200 block tracking-wider">
                  Allocated Time
                </span>
                <span className="font-mono text-xl font-extrabold tracking-tight">
                  30 Minutes
                </span>
              </div>
            </div>

            {/* Discussion Theme Banner */}
            <div className="bg-[#720000] text-white p-6 rounded-2xl shadow-xs">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-200 mb-1">
                <Sparkles className="w-4 h-4" />
                <span>Discussion Theme</span>
              </div>
              <h3 className="text-2xl font-bold tracking-tight mb-2">
                {MODULE_3_DATA.theme}
              </h3>
              <p className="text-xs text-white/85 leading-relaxed max-w-2xl">
                Express your feelings and opinions. Feel free to ask questions back to the examiner to keep the dialogue interactive.
              </p>
            </div>

            {/* 4 Talking Points */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs uppercase font-bold text-slate-500 tracking-wider">
                  Speaking Discussion Prompts
                </h3>
                <span className="text-xs text-slate-400 font-medium">4 Key Inquiries</span>
              </div>

              {MODULE_3_DATA.talkingPoints.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-2xs hover:border-[#720000]/40 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <span className="w-9 h-9 rounded-xl bg-[#720000] text-white font-mono font-bold text-sm flex items-center justify-center shrink-0">
                      {item.number}
                    </span>
                    <div className="flex-1">
                      <p className="text-lg font-bold text-slate-900 leading-snug">
                        "{item.question}"
                      </p>
                      <p className="text-xs text-slate-500 mt-2 font-medium">
                        Discussion ideas: {item.cue}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Final Action: Mark as Complete & Proceed to Marking Button */}
            <div className="bg-[#fdf2f2] border-2 border-[#fca5a5] p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#720000] flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-[#720000]" />
                  <span>Speaking Mock Test Concluded</span>
                </span>
                <h4 className="text-lg font-bold text-slate-900 mt-0.5">
                  Mark All Complete & Proceed to Marking Portal
                </h4>
                <p className="text-xs text-slate-600 mt-1 max-w-lg">
                  All 3 speaking modules have been carried out. Transition to the Instructor Marking Portal to grade criteria for Module 1, Module 2, and Module 3.
                </p>
              </div>
              <button
                onClick={() => {
                  onMarkAllComplete();
                  onProceedToMarking();
                }}
                className="w-full sm:w-auto px-6 py-3.5 bg-[#720000] hover:bg-[#5a0000] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer whitespace-nowrap hover:shadow-lg"
              >
                <span>Complete & Proceed to Marking Portal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Back Button */}
            <div className="pt-4 flex items-center justify-start border-t border-slate-200">
              <button
                onClick={() => setActiveModule(2)}
                className="text-xs text-slate-600 hover:text-slate-900 font-semibold cursor-pointer"
              >
                ← Back to Module 2
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
