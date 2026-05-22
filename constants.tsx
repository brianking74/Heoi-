
import React from 'react';

export const COLORS = {
  hkRed: '#de2810',
  charcoal: '#111827',
  gray: '#F3F4F6',
  gold: '#D97706'
};

export const ExploreIcon = ({ className = "w-6 h-6", fill = "#de2810" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="40" stroke={fill} strokeWidth="6" fill="none"/>
    <path d="M50 15 L50 85 M15 50 L85 50" stroke={fill} strokeWidth="6" strokeLinecap="round"/>
    <circle cx="50" cy="50" r="15" stroke={fill} strokeWidth="6" fill="none"/>
    <circle cx="50" cy="50" r="6" fill={fill}/>
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
    venue: 'Apliu Street'
  },
  {
    id: '5',
    title: 'Victoria Peak Morning Hike',
    vibe: ['Hidden Nature', 'Photo Spots'],
    difficulty: 'Moderate',
    cost: 'Free',
    location: 'The Peak',
    district: 'HK Island',
    duration: '3 hrs',
    image: 'https://images.unsplash.com/photo-1558231580-f002241cfda4?q=80&w=800&auto=format&fit=crop',
    description: 'Skip the tram and hike up the Morning Trail via Hatton Road. The rewarding sunrise views of the entire Victoria Harbour are unbeatable.',
    author: 'TrailBlazer',
    address: 'Hatton Road, Mid-Levels',
    date: 'Daily, Best before 8 AM',
    venue: 'Victoria Peak'
  },
  {
    id: '6',
    title: 'Temple Street Night Market',
    vibe: ['Neon Nightlife', 'Foodie Paradise'],
    difficulty: 'Easy',
    cost: '$$',
    location: 'Yau Ma Tei',
    district: 'Kowloon',
    duration: '2.5 hrs',
    image: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?q=80&w=800&auto=format&fit=crop',
    description: 'Immerse yourself in the bustling atmosphere of Temple Street. Try the claypot rice, browse antiques, and enjoy the neon-lit chaos.',
    author: 'NeonExplorer',
    address: 'Temple Street, Yau Ma Tei',
    date: 'Daily, 7 PM - Midnight',
    venue: 'Temple Street'
  },
  {
    id: '7',
    title: 'Lamma Island Seafood & Trails',
    vibe: ['Low-key Chill', 'Foodie Paradise'],
    difficulty: 'Moderate',
    cost: '$$$',
    location: 'Lamma Island',
    district: 'Outlying Islands',
    duration: '6 hrs',
    image: 'https://images.unsplash.com/photo-1516939884455-1445c8652f83?q=80&w=800&auto=format&fit=crop',
    description: 'Take a ferry to Yung Shue Wan, hike the family trail to Sok Kwu Wan, and reward yourself with fresh seafood at the stilted restaurants.',
    author: 'IslandHopper',
    address: 'Yung Shue Wan Ferry Pier',
    date: 'Weekends, 10 AM - 6 PM',
    venue: 'Lamma Island'
  },
  {
    id: '8',
    title: 'Lan Kwai Fong Pub Crawl',
    vibe: ['Neon Nightlife', 'Live Loud'],
    difficulty: 'Challenging',
    cost: '$$$$',
    location: 'Central',
    district: 'HK Island',
    duration: '4 hrs',
    image: 'https://images.unsplash.com/photo-1627664819818-e147d6221422?q=80&w=800&auto=format&fit=crop',
    description: 'Experience the epicentre of Hong Kong\'s nightlife. Move through crowded streets, hidden speakeasies, and rooftop bars in one unforgettable night.',
    author: 'PartyAnimal',
    address: 'Lan Kwai Fong, Central',
    date: 'Friday & Saturday nights',
    venue: 'LKF'
  }
];
