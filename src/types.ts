
export type ViewState = 'auth' | 'profile-setup' | 'interests' | 'matching' | 'voting' | 'app';
export type AppTab = 'home' | 'circle' | 'profile';

export interface User {
  id: string;
  name: string;
  age?: string;
  email: string;
  avatar: string; // URL or base64
  location: string;
  interests: string[]; 
  bio?: string;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: Date;
  isSystem?: boolean;
  type?: 'text' | 'poll' | 'event';
}

export interface CircleMember {
  id: string;
  name: string;
  avatar: string;
  isPlaceholder?: boolean;
}

export interface ActivitySuggestion {
  id: string;
  title: string;
  description: string;
  location: string;
  icon: string; 
  rating?: number; // 1-4
}

export interface PollOption {
  id: string;
  label: string; // e.g. "Saturday, 14:00"
  votes: number;
  votedByMe?: boolean;
}
