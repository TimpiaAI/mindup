import { create } from 'zustand';
import { MOCK_USER, MOCK_PROFILE, CAREER_CATEGORIES } from './mock-data';

interface UserData {
  name: string;
  surname: string;
  age: number;
  city: string;
  level: 'highschool' | 'student' | 'graduate' | 'employed';
  faculty?: string;
  year?: number;
  hasCV: boolean;
  profilePhoto?: string;
}

interface Skill {
  name: string;
  level: string;
  category: string;
}

interface Language {
  name: string;
  level: string;
}

interface Experience {
  id: string;
  type: string;
  title: string;
  organization: string;
  startYear: string;
  endYear: string;
  current: boolean;
  description: string;
  skills: string[];
}

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  credentialUrl?: string;
  imagePreview?: string;
}

interface Project {
  id: string;
  type: string;
  title: string;
  url: string;
  description?: string;
}

interface ProfileData {
  passions: string[];
  freeTime: string;
  clarityTrigger: string;
  skills: Skill[];
  languages: Language[];
  experiences: Experience[];
  certificates: Certificate[];
  projects: Project[];
}

interface CareerCategory {
  id: number;
  name: string;
  icon: string;
  match: number;
  reasons: string[];
}

interface ChatMessage {
  id: string;
  role: 'user' | 'mentor';
  content: string;
  timestamp: Date;
}

interface AppState {
  // User data
  user: UserData;
  profile: ProfileData;

  // Onboarding progress
  currentStep: number;
  totalSteps: number;

  // Demo mode - auto-fills and auto-navigates through all steps
  demoMode: boolean;

  // Career results
  visibleCategories: CareerCategory[];
  dismissedCategories: number[];

  // Chat state per job
  chatMessages: Record<number, ChatMessage[]>;

  // Actions
  setUser: (data: Partial<UserData>) => void;
  setProfile: (data: Partial<ProfileData>) => void;
  setCurrentStep: (step: number) => void;
  setDemoMode: (enabled: boolean) => void;
  dismissCategory: (categoryId: number) => void;
  addChatMessage: (jobId: number, message: ChatMessage) => void;
  resetOnboarding: () => void;
  loadMockData: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  // Initial state
  user: {
    name: '',
    surname: '',
    age: 0,
    city: '',
    level: 'student',
    hasCV: false
  },
  profile: {
    passions: [],
    freeTime: '',
    clarityTrigger: '',
    skills: [],
    languages: [],
    experiences: [],
    certificates: [],
    projects: []
  },
  currentStep: 1,
  totalSteps: 13,
  demoMode: false,
  visibleCategories: CAREER_CATEGORIES.slice(0, 4),
  dismissedCategories: [],
  chatMessages: {},

  // Actions
  setUser: (data) => set((state) => ({
    user: { ...state.user, ...data }
  })),

  setProfile: (data) => set((state) => ({
    profile: { ...state.profile, ...data }
  })),

  setCurrentStep: (step) => set({ currentStep: step }),

  setDemoMode: (enabled) => set({ demoMode: enabled }),

  dismissCategory: (categoryId) => set((state) => {
    const newDismissed = [...state.dismissedCategories, categoryId];
    const remainingCategories = CAREER_CATEGORIES.filter(
      cat => !newDismissed.includes(cat.id)
    );
    return {
      dismissedCategories: newDismissed,
      visibleCategories: remainingCategories.slice(0, 4)
    };
  }),

  addChatMessage: (jobId, message) => set((state) => ({
    chatMessages: {
      ...state.chatMessages,
      [jobId]: [...(state.chatMessages[jobId] || []), message]
    }
  })),

  resetOnboarding: () => set({
    user: {
      name: '',
      surname: '',
      age: 0,
      city: '',
      level: 'student',
      hasCV: false
    },
    profile: {
      passions: [],
      freeTime: '',
      clarityTrigger: '',
      skills: [],
      languages: [],
      experiences: [],
      certificates: [],
      projects: []
    },
    currentStep: 1,
    demoMode: false,
    visibleCategories: CAREER_CATEGORIES.slice(0, 4),
    dismissedCategories: [],
    chatMessages: {}
  }),

  loadMockData: () => set({
    user: MOCK_USER,
    profile: { ...MOCK_PROFILE, certificates: [], projects: [] },
    currentStep: 12,
    visibleCategories: CAREER_CATEGORIES.slice(0, 4),
    dismissedCategories: [],
    chatMessages: {}
  })
}));
