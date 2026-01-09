
import React from 'react';

export const COLORS = {
  hkRed: '#de2810',
  charcoal: '#111827',
  gray: '#F3F4F6',
  gold: '#D97706'
};

export const LanternIcon = ({ className = "w-6 h-6", fill = "#de2810" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M40 5 L60 5 L60 15 C80 20 85 45 85 55 C85 75 70 85 50 85 C30 85 15 75 15 55 C15 45 20 20 40 15 Z" fill={fill}/>
    <circle cx="38" cy="88" r="5" fill={fill} />
    <circle cx="62" cy="88" r="5" fill={fill} />
    <circle cx="50" cy="50" r="1.5" fill="white" opacity="0.4"/>
  </svg>
);

export const PERSONAS = [
  { id: 'traveler', label: 'Traveler', icon: '✈️' },
  { id: 'local', label: 'Local', icon: '🥟' },
  { id: 'expat', label: 'Expat', icon: '🏙️' },
  { id: 'nomad', label: 'Nomad', icon: '💻' }
];

export const VIBES = [
  'Weird & Wonderful',
  'Low-key Chill',
  'Deep Culture',
  'Neon Nightlife',
  'Hidden Nature',
  'Foodie Paradise',
  'Photo Spots',
  'Coffee Vibes',
  'Live Loud'
];

export const MOCK_USERS = [
  {
    id: 'u1',
    name: 'Chloe',
    persona: 'local',
    interests: ['Foodie Paradise', 'Photo Spots', 'Deep Culture'],
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
    bio: 'HK native. Let\'s find the best roast goose in Sham Shui Po. No tourists allowed!'
  },
  {
    id: 'u2',
    name: 'Marcus',
    persona: 'nomad',
    interests: ['Coffee Vibes', 'Low-key Chill'],
    photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&auto=format&fit=crop',
    bio: 'Digital nomad from Berlin. Looking for the city\'s quietest cafe with the strongest wifi.'
  },
  {
    id: 'u3',
    name: 'Yuki',
    persona: 'traveler',
    interests: ['Hidden Nature', 'Weird & Wonderful'],
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop',
    bio: 'Photographer traveling solo. Exploring the abandoned islands this weekend.'
  }
];

export const MOCK_EXPERIENCES = [
  {
    id: '1',
    title: 'Neon Sign Cemetery Walk',
    vibe: ['Photo Spots', 'Culture'],
    difficulty: 'Easy',
    cost: '$',
    location: 'Jordan',
    district: 'Kowloon',
    duration: '1.5 hrs',
    image: 'https://images.unsplash.com/photo-1542614392-446467384a22?q=80&w=800&auto=format&fit=crop',
    description: 'A walk through the quiet alleys of Jordan where the last master glassblowers still work.',
    author: 'Sam_HK',
    address: 'Starting at Jordan MTR Exit A, Temple Street'
  },
  {
    id: '2',
    title: 'Secret Temple Jazz Session',
    vibe: ['Jazz', 'Nightlife', 'Live Loud'],
    difficulty: 'Easy',
    cost: '$$',
    location: 'Sheung Wan',
    district: 'HK Island',
    duration: '3 hrs',
    image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=800&auto=format&fit=crop',
    description: 'An underground jazz bar tucked behind an incense shop. Entry via a sliding bookshelf.',
    author: 'JazzCat',
    address: 'Ground Floor, 12 Square Street, Sheung Wan'
  },
  {
    id: '4',
    title: 'Kwun Tong Indie Gig Night',
    vibe: ['Live Loud', 'Deep Culture'],
    difficulty: 'Easy',
    cost: '$$',
    location: 'Kwun Tong',
    district: 'Kowloon',
    duration: '4 hrs',
    image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=800&auto=format&fit=crop',
    description: 'Experience the raw energy of Hong Kong\'s indie scene in a converted industrial warehouse. Canto-shoegaze at its finest.',
    author: 'IndieSoul',
    address: 'Unit 4C, 15 Hung To Road, Kwun Tong'
  },
  {
    id: '3',
    title: 'Abandoned Village Hike',
    vibe: ['Nature', 'Offbeat'],
    difficulty: 'Moderate',
    cost: 'Free',
    location: 'Ma Wan Chung',
    district: 'Lantau',
    duration: '4 hrs',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop',
    description: 'Explore the overgrown ruins of a 200-year-old fishing village on the edge of the airport.',
    author: 'TrailMaster',
    address: 'Ma Wan Chung Village, Near Tung Chung Pier'
  }
];
