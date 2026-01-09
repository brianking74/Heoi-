
export type Persona = 'traveler' | 'local' | 'expat' | 'nomad';

export interface MicroExperience {
  id: string;
  title: string;
  vibe: string[];
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  cost: string;
  location: string;
  district: string;
  duration: string;
  image: string;
  description: string;
  author: string;
  address?: string;
  sourceUrl?: string;
  mapUrl?: string;
  isLive?: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  persona: Persona;
  interests: string[];
  budget: 'low' | 'medium' | 'high';
  isOpenToMeet: boolean;
  onboarded: boolean;
  bio?: string;
  photo?: string;
  isPremium?: boolean;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: number;
}

export interface ItineraryItem {
  time: string;
  title: string;
  description: string;
  location: string;
}

export interface ItineraryResponse {
  summary: string;
  items: ItineraryItem[];
  tips: string[];
}
