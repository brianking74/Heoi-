
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
    title: 'Tai Kwun Heritage & Art Walk',
    vibe: ['Deep Culture', 'Photo Spots'],
    difficulty: 'Easy',
    cost: 'Free',
    location: 'Central',
    district: 'HK Island',
    duration: '2 hrs',
    image: 'https://images.unsplash.com/photo-1595180630132-0c915f013d2f?q=80&w=800&auto=format&fit=crop',
    description: 'Explore the meticulously restored former Central Police Station compound. A hub of history, contemporary art exhibitions, and high-end dining tucked away in the heart of the city.',
    author: 'HK_Heritage',
    address: '10 Hollywood Road, Central',
    date: 'Daily, 10 AM - 11 PM',
    venue: 'Tai Kwun'
  },
  {
    id: '2',
    title: 'West Kowloon Sunset Session',
    vibe: ['Low-key Chill', 'Photo Spots'],
    difficulty: 'Easy',
    cost: 'Free',
    location: 'Tsim Sha Tsui',
    district: 'Kowloon',
    duration: '3 hrs',
    image: 'https://images.unsplash.com/photo-1507724249767-c29013ce9119?q=80&w=800&auto=format&fit=crop',
    description: 'Pack a picnic and join the locals at the Art Park. Best spot for watching the sun dip behind the skyscrapers of the island while the M+ Museum lights up.',
    author: 'PierWatcher',
    address: 'West Kowloon Cultural District, Tsim Sha Tsui',
    date: 'Weekends, 4 PM - 8 PM',
    venue: 'Art Park'
  },
  {
    id: '4',
    title: 'PMQ Night Market & Design',
    vibe: ['Foodie Paradise', 'Deep Culture'],
    difficulty: 'Easy',
    cost: '$',
    location: 'Sheung Wan',
    district: 'HK Island',
    duration: '2 hrs',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=800&auto=format&fit=crop',
    description: 'The former Police Married Quarters now hosts local designers and pop-up food stalls. Great for finding unique HK gifts and tasting modern twists on local snacks.',
    author: 'CantoDesign',
    address: '35 Aberdeen Street, Central',
    date: 'Check PMQ Calendar for Markets',
    venue: 'PMQ'
  },
  {
    id: '3',
    title: 'Sham Shui Po Digital Hunt',
    vibe: ['Weird & Wonderful', 'Coffee Vibes'],
    difficulty: 'Moderate',
    cost: '$',
    location: 'Sham Shui Po',
    district: 'Kowloon',
    duration: '4 hrs',
    image: 'https://images.unsplash.com/photo-1540910419316-ce72ca97461d?q=80&w=800&auto=format&fit=crop',
    description: 'From the tech chaos of Golden Computer Arcade to the hip cafes on Tai Nan Street. Experience the contrasting layers of Hong Kong\'s most honest neighborhood.',
    author: 'TechGeek',
    address: 'Fuk Wa Street and Tai Nan Street',
    date: 'Daily, 1 PM - 7 PM',
    venue: 'Apleliu St Area'
  }
];
