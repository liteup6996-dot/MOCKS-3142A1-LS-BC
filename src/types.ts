export interface ListeningQuestion {
  id: string;
  number: string;
  question: string;
  targetFocus?: string;
}

export interface ListeningSection {
  id: number;
  title: string;
  topic: string;
  audioPath: string;
  audioFilename: string;
  recordingFileRef: string;
  description: string;
  questions: ListeningQuestion[];
}

export interface ListeningCriterion {
  id: 'key_info' | 'context' | 'specific_details' | 'comprehension';
  name: string;
  subdesc: string;
  score: number; // 1 to 5
}

export interface SectionAssessment {
  sectionId: number;
  sectionTitle: string;
  criteria: ListeningCriterion[];
}

export interface CandidateData {
  fullName: string;
  candidateNumber: string;
  targetExam: string;
  testDate: string;
  sessionID: string;
  deploymentUrl: string;
}

export type Verdict = 'pass' | 'fail';
