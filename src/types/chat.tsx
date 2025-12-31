export type MessageFeedback = 'like' | 'dislike' | null;

export interface ChatMessage {
  id: string;
  role: 'user' | 'ai';
  content: string;
  feedback?: 'like' | 'dislike' | null;
  createdAt: number;
}
