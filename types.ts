
export interface Module {
  id: string;
  title: string;
  description: string;
  topics: string[];
  year: number;
  difficulty: 'Low' | 'Medium' | 'High';
  estimatedHours: number;
  category: string;
  practicalGoal: string; // The "Do it now" task
}

export interface UserProgress {
  completedTopics: string[];
  activeModuleId: string | null;
  dailyStreak: number;
  lastActive: string;
}

export type LearningState = 'idle' | 'focusing' | 'breaking' | 'reviewing';

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}
