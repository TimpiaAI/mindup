export interface UserData {
  name: string;
  surname: string;
  age: number;
  city: string;
  level: 'highschool' | 'student' | 'graduate' | 'employed';
  faculty?: string;
  year?: number;
  hasCV: boolean;
}

export interface Skill {
  name: string;
  level: string;
  category: string;
}

export interface Language {
  name: string;
  level: string;
}

export interface Experience {
  id: string;
  type: 'volunteer' | 'course' | 'project' | 'competition' | 'job';
  title: string;
  organization: string;
  year: string;
  description: string;
  skills: string[];
}

export interface ProfileData {
  passions: string[];
  freeTime: string;
  clarityTrigger: string;
  skills: Skill[];
  languages: Language[];
  experiences: Experience[];
}

export interface CareerCategory {
  id: number;
  name: string;
  icon: string;
  match: number;
  reasons: string[];
}

export interface Job {
  id: number;
  categoryId: number;
  name: string;
  icon: string;
  match: number;
  shortDescription: string;
  description: string;
  salaryMin: number;
  salaryMax: number;
  currency: string;
  studyLevel: string;
  requiredSkills: string[];
  niceToHaveSkills: string[];
  dayInLife: string;
}

export interface Faculty {
  id: number;
  name: string;
  university: string;
  shortName: string;
  city: string;
  county: string;
  logo: string;
  logoUrl?: string;
  website: string;
  duration: number;
  credits: number;
  language: string;
  budgetSeats: number;
  feeSeats: number;
  yearlyFee: number;
  minGrade: number;
  difficulty: number;
  dropoutRate: number;
  employmentRate: number;
  admissionProcess: string;
  admissionDates: {
    registration: string;
    exam: string;
    results: string;
  };
  curriculum: Record<string, string>;
  reviews: Review[];
}

export interface Review {
  author: string;
  status: string;
  rating: number;
  text: string;
}

export interface Company {
  id: number;
  name: string;
  logo: string;
  tagline: string;
  description: string;
  story: string;
  benefits: string[];
  cities: string[];
  employees: string;
  website: string;
  hrEmail: string;
  hrPhone: string;
  openPositions: OpenPosition[];
}

export interface OpenPosition {
  title: string;
  type: string;
  experience: string;
}

export interface Mentor {
  name: string;
  role: string;
  company: string;
  years: number;
  avatar: string;
  responses: Record<string, string>;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'mentor';
  content: string;
  timestamp: Date;
}
