import { ModuleMarkingGroup, ModuleA1Assessment } from '../types';

export const INITIAL_A1_MODULE_ASSESSMENTS: ModuleA1Assessment[] = [
  {
    moduleId: 1,
    moduleName: 'Module 1 Assessment: Personal Identification & Daily Life',
    allocatedTime: '15 Minutes',
    criteria: [
      {
        id: 'obtaining',
        name: 'Obtaining Information',
        subdesc: 'Understanding questions/instructions',
        score: 4,
      },
      {
        id: 'conveying',
        name: 'Conveying Information',
        subdesc: 'Sharing basic facts, feelings, opinions',
        score: 4,
      },
      {
        id: 'speaking',
        name: 'Speaking to Communicate',
        subdesc: 'Clarity, pronunciation, basic vocabulary',
        score: 4,
      },
      {
        id: 'discussion',
        name: 'Engaging in Discussion',
        subdesc: 'Interacting, keeping the conversation going',
        score: 4,
      },
    ],
  },
  {
    moduleId: 2,
    moduleName: 'Module 2 Assessment: Eliciting Information',
    allocatedTime: '15 Minutes',
    criteria: [
      {
        id: 'obtaining',
        name: 'Obtaining Information',
        subdesc: 'Understanding questions/instructions',
        score: 4,
      },
      {
        id: 'conveying',
        name: 'Conveying Information',
        subdesc: 'Sharing basic facts, feelings, opinions',
        score: 4,
      },
      {
        id: 'speaking',
        name: 'Speaking to Communicate',
        subdesc: 'Clarity, pronunciation, basic vocabulary',
        score: 3,
      },
      {
        id: 'discussion',
        name: 'Engaging in Discussion',
        subdesc: 'Interacting, keeping the conversation going',
        score: 4,
      },
    ],
  },
  {
    moduleId: 3,
    moduleName: 'Module 3 Assessment: Extended Interactive Discussion',
    allocatedTime: '30 Minutes',
    criteria: [
      {
        id: 'obtaining',
        name: 'Obtaining Information',
        subdesc: 'Understanding questions/instructions',
        score: 4,
      },
      {
        id: 'conveying',
        name: 'Conveying Information',
        subdesc: 'Sharing basic facts, feelings, opinions',
        score: 4,
      },
      {
        id: 'speaking',
        name: 'Speaking to Communicate',
        subdesc: 'Clarity, pronunciation, basic vocabulary',
        score: 4,
      },
      {
        id: 'discussion',
        name: 'Engaging in Discussion',
        subdesc: 'Interacting, keeping the conversation going',
        score: 4,
      },
    ],
  },
];

export interface ModuleContent {
  id: number;
  title: string;
  durationLabel: string;
  defaultSeconds: number;
  description: string;
}

export const EXAM_MODULES: ModuleContent[] = [
  {
    id: 1,
    title: 'Module 1: Personal Identification & Daily Life',
    durationLabel: '15:00',
    defaultSeconds: 900,
    description: 'Candidate introduction, spelling first name, living environment, daily routine, and Sunday leisure habits.'
  },
  {
    id: 2,
    title: 'Module 2: Eliciting Information',
    durationLabel: '15:00',
    defaultSeconds: 900,
    description: 'Candidate asks examiner questions about planning a weekend trip, followed by a 10-minute continuous conversational discussion on travel.'
  },
  {
    id: 3,
    title: 'Module 3: Extended Interactive Discussion',
    durationLabel: '30:00',
    defaultSeconds: 1800,
    description: 'Collaborative extended discussion on Technology, Hobbies, and Communication to test fluency, opinion sharing, and reciprocal conversation.'
  }
];

export const MODULE_1_QUESTIONS = [
  {
    id: 'm1-q1',
    number: '01',
    question: 'Could you tell me your full name, and spell your first name for me?',
    examinerNote: 'Assess clear alphabet spelling, vowel phonetics (A, E, I), and consonant discrimination.'
  },
  {
    id: 'm1-q2',
    number: '02',
    question: 'Tell me about the place where you live right now.',
    examinerNote: 'Check descriptive vocabulary (flat, house, quiet area, city centre, amenities).'
  },
  {
    id: 'm1-q3',
    number: '03',
    question: 'Describe your daily routine from the moment you wake up.',
    examinerNote: 'Assess simple present tense consistency, time adverbs (at 7 AM, then, after that).'
  },
  {
    id: 'm1-q4',
    number: '04',
    question: 'What do you usually do on a Sunday morning, and who do you spend it with?',
    examinerNote: 'Look for leisure verbs, prepositions with people (with my family/friends), and habit frequency.'
  }
];

export const MODULE_2_DATA = {
  candidateTaskPrompt: 'I am your neighbor. I want you to act like a neighbor and ask me questions about our neighborhood, local services, and living next door.',
  promptCues: [
    { word: 'Where', hint: 'Nearest supermarket, grocery store, chemist' },
    { word: 'When', hint: 'Rubbish & recycling bin collection days' },
    { word: 'Is there', hint: "Doctor's clinic, park, or pharmacy nearby" },
    { word: 'How', hint: 'Bus / train into town centre, local parking' },
    { word: 'What time', hint: 'Local shops open and close' },
    { word: 'Is it quiet', hint: 'Evening noise levels, neighborhood atmosphere' }
  ],
  sampleNeighborQuestions: [
    'Where is the nearest supermarket or grocery shop?',
    'What days is the rubbish bin collected on our street?',
    'Is there a bus stop or train station close by?',
    'Is this neighborhood usually quiet in the evenings?'
  ],
  subsectionBTopic: 'Some people prefer staying at home to relax on weekends, while others like going out to meet people or do activities.',
  subsectionBGuidance: 'A 5–7 minute continuous interactive conversation is carried out in Subsection B on this topic — engage in natural back-and-forth discussion about weekend habits and preferences rather than isolated question-and-answers.'
};

export const MODULE_3_DATA = {
  masterSeconds: 1800, // 30 mins
  theme: 'Technology, Hobbies, and Communication',
  talkingPoints: [
    {
      id: 'm3-q1',
      number: '01',
      question: "Let's talk about how we communicate today. How often do you use your mobile phone, and what do you use it for?",
      cue: 'Messaging apps (WhatsApp), calling relatives, social media, work vs casual'
    },
    {
      id: 'm3-q2',
      number: '02',
      question: 'Do you think people spend too much time on the internet?',
      cue: 'Screen time habits, benefits of staying connected vs distractions'
    },
    {
      id: 'm3-q3',
      number: '03',
      question: 'What are your favorite hobbies, and how did you start doing them?',
      cue: 'Sports, cooking, music, reading, how long they have practiced it'
    },
    {
      id: 'm3-q4',
      number: '04',
      question: 'How do you think technology will change the way we work in the future?',
      cue: 'Working from home, online meetings, artificial intelligence, automated tools'
    }
  ]
};

export const INITIAL_MODULE_MARKING: ModuleMarkingGroup[] = [
  {
    moduleId: 1,
    moduleTitle: 'Module 1: Personal Identification & Daily Life',
    allocatedTime: '15 Minutes',
    aspects: [
      {
        id: 'm1_spelling',
        name: 'Full Name & Letter-by-Letter Spelling',
        shortDesc: 'Vowel discrimination (A, E, I) and clear alphabet naming',
        score: 4,
      },
      {
        id: 'm1_living',
        name: 'Living Environment Description',
        shortDesc: 'Vocabulary for flat/house, area characteristics, and amenities',
        score: 4,
      },
      {
        id: 'm1_routine',
        name: 'Daily Routine Sequence & Simple Present',
        shortDesc: 'Time markers (at 7 AM, then, after) and correct verb conjugations',
        score: 4,
      },
      {
        id: 'm1_sunday',
        name: 'Sunday Morning Habits & Leisure Prepositions',
        shortDesc: 'Activities with family/friends and frequency adverbs',
        score: 3,
      },
    ],
  },
  {
    moduleId: 2,
    moduleTitle: 'Module 2: Eliciting Information & Discussion',
    allocatedTime: '15 Minutes',
    aspects: [
      {
        id: 'm2_neighbor_q',
        name: 'Subsection A: Neighbor Roleplay Question Formulation',
        shortDesc: 'Forming natural inquiries (Where, When, How, Is there)',
        score: 4,
      },
      {
        id: 'm2_question_clarity',
        name: 'Subsection A: Question Intelligibility & Pronunciation',
        shortDesc: 'Correct question intonation and word pronunciation',
        score: 4,
      },
      {
        id: 'm2_discussion_flow',
        name: 'Subsection B: 5–7 Min Discussion on Weekend Habits',
        shortDesc: 'Sharing personal thoughts on staying home vs going out',
        score: 4,
      },
      {
        id: 'm2_turn_taking',
        name: 'Subsection B: Conversational Turn-Taking & Reasons',
        shortDesc: 'Giving justifications and sustaining back-and-forth dialogue',
        score: 3,
      },
    ],
  },
  {
    moduleId: 3,
    moduleTitle: 'Module 3: Extended Interactive Discussion',
    allocatedTime: '30 Minutes',
    aspects: [
      {
        id: 'm3_phone_tech',
        name: 'Mobile Phone & Daily Communication Discussion',
        shortDesc: 'Describing communication habits, apps used, and personal usage',
        score: 4,
      },
      {
        id: 'm3_internet_opinions',
        name: 'Internet & Screen Time Opinion Expression',
        shortDesc: 'Expressing viewpoints on whether people spend too much time online',
        score: 3,
      },
      {
        id: 'm3_hobbies',
        name: 'Personal Hobbies & Origin Story Fluency',
        shortDesc: 'Detailing interests, timeline, and explaining how hobbies began',
        score: 4,
      },
      {
        id: 'm3_future_work',
        name: 'Future of Technology in Workplace Speculation',
        shortDesc: 'Projecting thoughts on future working habits with technology',
        score: 4,
      },
    ],
  },
];

export const QUICK_TAGS = [
  'Clear pronunciation',
  'Natural pace & flow',
  'Good turn-taking',
  'Accurate letter spelling',
  'Understands simple question',
  'Hesitation on past tense',
  'Needs prompt repetition',
  'Answers with full sentence',
  'Rich vocabulary used'
];
