export interface CurriculumItem {
  id: number;
  title: string;
  period: string;
  description: string;
  kpi: string;
  outcomes: string[];
}

export interface Member {
  id: number;
  name: string;
  role: string;
  category?: string;
  image: string;
  bio: string;
  education: string;
  skills: string[];
  contact: string;
}

export interface FAQ {
  question: string;
  answer: string;
}
