export interface Reading {
  title: string;
  author: string;
  type: 'Book' | 'Paper' | 'Article' | 'Video';
  description: string;
}

export interface Assignment {
  title: string;
  description: string;
  estimatedHours: number;
}

export interface Module {
  weekNumber: number;
  topic: string;
  description: string;
  keyConcepts: string[];
}

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  deliverables: string[];
}

export interface Capstone {
  title: string;
  problemStatement: string;
  phases: string[];
  finalDeliverable: string;
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
  readings: Reading[];
  assignments: Assignment[];
  projects: Project[];
  capstone: Capstone;
}
