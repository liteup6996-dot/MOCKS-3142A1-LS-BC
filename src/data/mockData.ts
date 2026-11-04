import { ListeningSection, SectionAssessment } from '../types';

export const LISTENING_SECTIONS: ListeningSection[] = [
  {
    id: 1,
    title: 'Section 1',
    topic: 'Family, Home and Daily Routine',
    audioPath: '/assets/aistudio/section-1_0fdea148.mp3',
    audioFilename: 'section-1.mp3',
    recordingFileRef: 'section-1_0fdea148.mp3',
    description: "Listen to the recording about Mark's family, new home, children, and daily family routine, then answer the questions below.",
    questions: [
      {
        id: 's1-q1',
        number: '01',
        question: "Why did Mark's family move to a new house?",
        targetFocus: 'Reason for relocation / family need',
      },
      {
        id: 's1-q2',
        number: '02',
        question: 'How many bedrooms does the new house have?',
        targetFocus: 'Numerical detail / house feature',
      },
      {
        id: 's1-q3',
        number: '03',
        question: 'How many children does Mark have?',
        targetFocus: 'Family structure / number',
      },
      {
        id: 's1-q4',
        number: '04',
        question: "How old is Mark's son?",
        targetFocus: 'Age recognition',
      },
      {
        id: 's1-q5',
        number: '05',
        question: "When does Mark's mother usually visit?",
        targetFocus: 'Frequency & routine timing',
      },
    ],
  },
  {
    id: 2,
    title: 'Section 2',
    topic: "Making a Doctor's Appointment",
    audioPath: '/assets/aistudio/section2_67b5eeda.mp3',
    audioFilename: 'section2.mp3',
    recordingFileRef: 'section2_67b5eeda.mp3',
    description: "Listen to the conversation at the doctor's clinic reception regarding booking a consultation, then answer the questions below.",
    questions: [
      {
        id: 's2-q1',
        number: '01',
        question: 'Why does David want to visit the doctor?',
        targetFocus: 'Medical visit reason / symptoms',
      },
      {
        id: 's2-q2',
        number: '02',
        question: "What is David's surname?",
        targetFocus: 'Name spelling / family name',
      },
      {
        id: 's2-q3',
        number: '03',
        question: 'Which doctor does David prefer to see?',
        targetFocus: 'Doctor name / medical preference',
      },
      {
        id: 's2-q4',
        number: '04',
        question: 'What time is the appointment tomorrow?',
        targetFocus: 'Appointment time / clock detail',
      },
      {
        id: 's2-q5',
        number: '05',
        question: 'What should David bring with him?',
        targetFocus: 'Required documents / identification',
      },
    ],
  },
  {
    id: 3,
    title: 'Section 3',
    topic: 'Renting a House and the Neighbourhood',
    audioPath: '/assets/aistudio/section3_d4b7b764.mp3',
    audioFilename: 'section3.mp3',
    recordingFileRef: 'section3_d4b7b764.mp3',
    description: 'Listen to Hassan and Ali discussing house rental options, neighbourhood amenities, schools, transport, and visits, then answer the questions below.',
    questions: [
      {
        id: 's3-q1',
        number: '01',
        question: 'How long has Hassan lived in the neighbourhood?',
        targetFocus: 'Duration of residency',
      },
      {
        id: 's3-q2',
        number: '02',
        question: 'How many bedrooms does Ali need?',
        targetFocus: 'Accommodation requirement',
      },
      {
        id: 's3-q3',
        number: '03',
        question: 'Why does Ali want to live near a school?',
        targetFocus: 'Reason for location preference',
      },
      {
        id: 's3-q4',
        number: '04',
        question: 'How much is the estimated monthly rent?',
        targetFocus: 'Financial currency / price amount',
      },
      {
        id: 's3-q5',
        number: '05',
        question: "Where do Hassan's children usually play?",
        targetFocus: 'Local facility / recreational area',
      },
      {
        id: 's3-q6',
        number: '06',
        question: "How far is the bus stop from Hassan's house?",
        targetFocus: 'Walking distance / transit proximity',
      },
      {
        id: 's3-q7',
        number: '07',
        question: 'How often do buses arrive during the day?',
        targetFocus: 'Transit frequency / schedule interval',
      },
      {
        id: 's3-q8',
        number: '08',
        question: 'When does Ali plan to visit the neighbourhood?',
        targetFocus: 'Visit date / schedule plan',
      },
      {
        id: 's3-q9',
        number: '09',
        question: 'Who will Ali bring with him?',
        targetFocus: 'Accompanying persons',
      },
      {
        id: 's3-q10',
        number: '10',
        question: 'How can Hassan help Ali find a house?',
        targetFocus: 'Assistance / real estate connection',
      },
    ],
  },
  {
    id: 4,
    title: 'Section 4',
    topic: 'Town Flooding and Community Emergency',
    audioPath: '/assets/aistudio/section4_af465140.mp3',
    audioFilename: 'section4.mp3',
    recordingFileRef: 'section4_af465140.mp3',
    description: 'Listen to the emergency announcement regarding local flooding, safety precautions, shelter location, relief donations, and community meetings.',
    questions: [
      {
        id: 's4-q1',
        number: '01',
        question: 'What has caused flooding in the town?',
        targetFocus: 'Cause of natural hazard / weather event',
      },
      {
        id: 's4-q2',
        number: '02',
        question: 'Which places should people avoid travelling through?',
        targetFocus: 'Safety precautions / hazard zones',
      },
      {
        id: 's4-q3',
        number: '03',
        question: 'Where should children not play?',
        targetFocus: 'Child safety / dangerous areas',
      },
      {
        id: 's4-q4',
        number: '04',
        question: 'Where will the emergency shelter be located?',
        targetFocus: 'Public relief venue / shelter address',
      },
      {
        id: 's4-q5',
        number: '05',
        question: 'What three items can people donate to affected families?',
        targetFocus: 'Essential relief items / charity supplies',
      },
      {
        id: 's4-q6',
        number: '06',
        question: "Where is the emergency team's office?",
        targetFocus: 'Official coordination office location',
      },
      {
        id: 's4-q7',
        number: '07',
        question: 'When will the next community meeting take place?',
        targetFocus: 'Meeting schedule / date and time',
      },
    ],
  },
];

export const INITIAL_SECTION_ASSESSMENTS: SectionAssessment[] = [
  {
    sectionId: 1,
    sectionTitle: 'Section 1: Family, Home and Daily Routine',
    criteria: [
      {
        id: 'key_info',
        name: 'Obtaining & Identifying Key Information',
        subdesc: 'Extracting family facts, house bedrooms, children numbers',
        score: 4,
      },
      {
        id: 'context',
        name: 'Understanding Spoken Context & Situation',
        subdesc: 'Recognising family background and relocation motivation',
        score: 4,
      },
      {
        id: 'specific_details',
        name: 'Extracting Specific Details & Routine Times',
        subdesc: 'Identifying son age and mother visit frequency accurately',
        score: 4,
      },
      {
        id: 'comprehension',
        name: 'Overall Listening Comprehension',
        subdesc: 'Grasping natural speech flow without distortion',
        score: 4,
      },
    ],
  },
  {
    sectionId: 2,
    sectionTitle: "Section 2: Making a Doctor's Appointment",
    criteria: [
      {
        id: 'key_info',
        name: 'Obtaining & Identifying Key Information',
        subdesc: 'Capturing surname spelling, doctor preference, documents',
        score: 4,
      },
      {
        id: 'context',
        name: 'Understanding Spoken Context & Situation',
        subdesc: 'Interpreting clinical dialogue and reception instructions',
        score: 4,
      },
      {
        id: 'specific_details',
        name: 'Extracting Specific Details & Appointment Times',
        subdesc: 'Confirming exact consultation hour and required items',
        score: 4,
      },
      {
        id: 'comprehension',
        name: 'Overall Listening Comprehension',
        subdesc: 'Comprehending receptionist inquiries accurately',
        score: 3,
      },
    ],
  },
  {
    sectionId: 3,
    sectionTitle: 'Section 3: Renting a House and the Neighbourhood',
    criteria: [
      {
        id: 'key_info',
        name: 'Obtaining & Identifying Key Information',
        subdesc: 'Tracking rent prices, bedroom count, and bus schedule numbers',
        score: 4,
      },
      {
        id: 'context',
        name: 'Understanding Spoken Context & Situation',
        subdesc: 'Understanding community living, neighbourhood advice & school proximity',
        score: 4,
      },
      {
        id: 'specific_details',
        name: 'Extracting Specific Details & Geographic Facts',
        subdesc: 'Noting bus stop distance, children play areas, and visit dates',
        score: 4,
      },
      {
        id: 'comprehension',
        name: 'Overall Listening Comprehension',
        subdesc: 'Sustained listening accuracy across extended 10-item dialogue',
        score: 4,
      },
    ],
  },
  {
    sectionId: 4,
    sectionTitle: 'Section 4: Town Flooding and Community Emergency',
    criteria: [
      {
        id: 'key_info',
        name: 'Obtaining & Identifying Key Information',
        subdesc: 'Identifying flood causes, shelter location, office address',
        score: 4,
      },
      {
        id: 'context',
        name: 'Understanding Spoken Context & Situation',
        subdesc: 'Understanding emergency broadcast safety rules & hazard alerts',
        score: 4,
      },
      {
        id: 'specific_details',
        name: 'Extracting Specific Details & Instructions',
        subdesc: 'Noting donation items, travel avoidance areas, and meeting time',
        score: 4,
      },
      {
        id: 'comprehension',
        name: 'Overall Listening Comprehension',
        subdesc: 'Interpreting critical public announcements and safety instructions',
        score: 4,
      },
    ],
  },
];

export const LISTENING_QUICK_TAGS = [
  'Accurate numerical extraction',
  'Understood time & schedule',
  'Recognised name & spelling',
  'Understood relocation reason',
  'Identified rent & bus frequency',
  'Captured flood cause & hazards',
  'Accurately noted shelter & office',
  'Listened to donation list (3 items)',
  'Accurate on first listen',
  'Strong CEFR A1 comprehension',
];
