// User types
export interface User {
  userId: string;
  preferredLanguage: 'en' | 'es';
  currentState: string;
  hasPremium: boolean;
}

// State guide types
export interface StateGuide {
  stateName: string;
  rightsSummary: string;
  scriptExamples: string[];
  language: 'en' | 'es';
  dosList: string[];
  dontsList: string[];
}

// Encounter record types
export interface EncounterRecord {
  recordId: string;
  userId: string;
  timestamp: Date;
  audioUrl?: string;
  videoUrl?: string;
  notes: string;
  sharedTo: string[];
  encryptionKey?: string;
  location?: {
    state: string;
    city?: string;
  };
}

// Shareable card types
export interface ShareableCard {
  cardId: string;
  recordId: string;
  generatedContent: string;
  timestamp: Date;
  link: string;
  metadata: {
    state: string;
    language: string;
    type: 'encounter' | 'rights-summary';
  };
}

// Script generation types
export interface ScriptRequest {
  scenario: string;
  state: string;
  language: 'en' | 'es';
  userContext?: {
    age?: number;
    hasChildren?: boolean;
    isMinor?: boolean;
  };
}

export interface GeneratedScript {
  id: string;
  scenario: string;
  script: string;
  doSay: string[];
  dontSay: string[];
  additionalTips: string[];
  language: 'en' | 'es';
  state: string;
}

// Recording types
export interface RecordingState {
  isRecording: boolean;
  recordingType: 'audio' | 'video' | null;
  duration: number;
  filePath?: string;
}

// App state types
export interface AppState {
  user: User | null;
  currentState: string;
  selectedLanguage: 'en' | 'es';
  isOnboarded: boolean;
  recordings: EncounterRecord[];
  generatedScripts: GeneratedScript[];
}
