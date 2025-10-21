// Tipos para o projeto ReciclaWeb - Borboleta

export interface TrashCategory {
  id: string;
  icon: string;
  title: string;
  description: string;
  color: string;
  tip?: string;
}

export interface GameItem {
  id: string;
  icon: string;
  name: string;
  category: string;
}

export interface GameStats {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
}

export interface UserProgress {
  level: number;
  experience: number;
  achievements: string[];
}
