export interface A1Criterion {
  id: 'obtaining' | 'conveying' | 'speaking' | 'discussion';
  name: string;
  subdesc: string;
  score: number; // 1 to 5
}

export interface ModuleA1Assessment {
  moduleId: number;
  moduleName: string;
  allocatedTime: string;
  criteria: A1Criterion[];
}

export interface ModuleAspect {
  id: string;
  name: string;
  shortDesc: string;
  score: number; // 1 to 5
}

export interface ModuleMarkingGroup {
  moduleId: number;
  moduleTitle: string;
  allocatedTime: string;
  aspects: ModuleAspect[];
}

export interface RubricCriteria {
  id: string;
  name: string;
  shortDesc: string;
  score: number; // 1 to 5
}

export interface CandidateData {
  fullName: string;
  candidateNumber: string;
  targetExam: string;
  testDate: string;
  sessionID: string;
}

export type Verdict = 'pass' | 'fail';

