
export interface Reading {
  title: string;
  author: string;
  type: 'Book' | 'Paper' | 'Article' | 'Video';
  description: string;
  url?: string;
}

export interface Assignment {
  title: string;
  description: string;
  estimatedHours: number;
  technicalRequirements: string[];
  relevantLinks: { title: string; url: string }[];
}

export interface Module {
  weekNumber: number;
  topic: string;
  description: string;
  keyConcepts: string[];
  readings: Reading[];
}

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  deliverables: string[];
}

export interface Capstone {
  title: string;
  description: string;
  requirements: {
    complexity: string;
    dataScale: string;
    deployment: string;
    industryStandards: string;
  };
  suggestedTopics: string[];
  milestones: string[];
  deliverables: string[];
}

export interface CourseData {
  code: string;
  title: string;
  department: string;
  instructor: string;
  description: string;
  prerequisites: string[];
  learningOutcomes: string[];
  modules: Module[];
  assignments: Assignment[];
  projects: Project[];
  capstone: Capstone;
}

export interface GradingResult {
  score: number;
  feedback: string;
}
