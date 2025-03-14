export type Location = {
  lat: number;
  lng: number;
};

export type Badge = {
  id: string;
  name: string;
  description: string;
  image: string;
  level: 'new' | 'experienced' | 'master';
  requiredVisits: number;
};

export type Review = {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
  foodRating: number;
  serviceRating: number;
  ambienceRating: number;
};

export type SupperClub = {
  id: string;
  name: string;
  description: string;
  location: Location;
  address: string;
  city: string;
  state: string;
  county: string;
  image: string;
  rating: number;
  reviews: Review[];
  visited?: boolean;
  specialties: string[];
  openHours: string;
  phoneNumber: string;
  website?: string;
};

export type UserProfile = {
  id: string;
  name: string;
  avatar: string;
  clubsVisited: string[];
  badges: Badge[];
  totalVisits: number;
  rank: number;
  joinDate: string;
  bio?: string;
};

export type LeaderboardEntry = {
  id: string;
  name: string;
  avatar: string;
  totalVisits: number;
  rank: number;
};

export type LeaderboardFilter = 'overall' | 'state' | 'county' | 'city';

export type MapFilter = {
  region?: string;
  cuisine?: string;
  distance?: number;
  visited?: boolean;
};

export type Region = {
  id: string;
  name: string;
  states: string[];
};

export type UserStatus = {
  id: string;
  title: string;
  description: string;
  category: 'visits' | 'reviews' | 'leaderboard';
  icon?: string;
  progress?: {
    current: number;
    max: number;
  };
};
