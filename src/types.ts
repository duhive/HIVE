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
  department?: string;
  skills: string[];
  expertise?: string[];
  contact: string;
  email?: string;
  experience?: string[];
  isAlumni?: boolean;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Column {
  id: string;
  title: string;
  subtitle: string;
  excerpt: string;
  content: string;
  category: string;
  author: {
    name: string;
    role: string;
    affiliation: string;
    image: string;
  };
  date: string;
  readTime: string;
  likes: number;
  tags: string[];
  coverImage: string;
  createdAt?: any;
}

