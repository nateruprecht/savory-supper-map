import { UserProfile } from '@/lib/types';

export type UserStatus = {
  id: string;
  title: string;
  description: string;
  category: 'visits' | 'reviews' | 'leaderboard';
  icon?: string; // Optional path to status icon
  progress?: {
    current: number;
    max: number;
  };
};

// Status threshold configurations
export const VISIT_THRESHOLDS = [5, 10, 25, 50, 100, 150, 200, 300, 400, 500];
export const REVIEW_THRESHOLDS = [5, 10, 25, 50, 100, 150, 200, 250, 300, 400];

/**
 * Visit status definitions
 */
export const visitStatuses: { threshold: number; status: UserStatus }[] = [
  {
    threshold: 5,
    status: {
      id: 'supper-club-newbie',
      title: 'Supper Club Newbie',
      description: 'Visited 5 clubs',
      category: 'visits',
    }
  },
  {
    threshold: 10,
    status: {
      id: 'food-adventurer',
      title: 'Food Adventurer',
      description: 'Visited 10 clubs',
      category: 'visits',
    }
  },
  {
    threshold: 25,
    status: {
      id: 'seasoned-taster',
      title: 'Seasoned Taster',
      description: 'Visited 25 clubs',
      category: 'visits',
    }
  },
  {
    threshold: 50,
    status: {
      id: 'dedicated-diner',
      title: 'Dedicated Diner',
      description: 'Visited 50 clubs',
      category: 'visits',
    }
  },
  {
    threshold: 100,
    status: {
      id: 'food-master',
      title: 'Food Master',
      description: 'Visited 100 clubs',
      category: 'visits',
    }
  },
  {
    threshold: 150,
    status: {
      id: 'culinary-legend',
      title: 'Culinary Legend',
      description: 'Visited 150 clubs',
      category: 'visits',
    }
  },
  {
    threshold: 200,
    status: {
      id: 'midwest-connoisseur',
      title: 'Midwest Connoisseur',
      description: 'Visited 200 clubs',
      category: 'visits',
    }
  },
  {
    threshold: 300,
    status: {
      id: 'food-odyssey-master',
      title: 'Food Odyssey Master',
      description: 'Visited 300 clubs',
      category: 'visits',
    }
  },
  {
    threshold: 400,
    status: {
      id: 'dining-nomad',
      title: 'The Dining Nomad',
      description: 'Visited 400 clubs',
      category: 'visits',
    }
  },
  {
    threshold: 500,
    status: {
      id: 'supper-club-royalty',
      title: 'Supper Club Royalty',
      description: 'Visited 500+ clubs',
      category: 'visits',
    }
  },
];

/**
 * Review status definitions
 */
export const reviewStatuses: { threshold: number; status: UserStatus }[] = [
  {
    threshold: 5,
    status: {
      id: 'supper-club-critic',
      title: 'Supper Club Critic',
      description: 'Reviewed 5 clubs',
      category: 'reviews',
    }
  },
  {
    threshold: 10,
    status: {
      id: 'food-commentator',
      title: 'Food Commentator',
      description: 'Reviewed 10 clubs',
      category: 'reviews',
    }
  },
  {
    threshold: 25,
    status: {
      id: 'vocal-foodie',
      title: 'Vocal Foodie',
      description: 'Reviewed 25 clubs',
      category: 'reviews',
    }
  },
  {
    threshold: 50,
    status: {
      id: 'dining-influencer',
      title: 'Dining Influencer',
      description: 'Reviewed 50 clubs',
      category: 'reviews',
    }
  },
  {
    threshold: 100,
    status: {
      id: 'trusted-critic',
      title: 'Trusted Critic',
      description: 'Reviewed 100 clubs',
      category: 'reviews',
    }
  },
  {
    threshold: 150,
    status: {
      id: 'review-guru',
      title: 'Review Guru',
      description: 'Reviewed 150 clubs',
      category: 'reviews',
    }
  },
  {
    threshold: 200,
    status: {
      id: 'top-rated-reviewer',
      title: 'Top Rated Reviewer',
      description: 'Reviewed 200 clubs',
      category: 'reviews',
    }
  },
  {
    threshold: 250,
    status: {
      id: 'food-feedback-icon',
      title: 'Food Feedback Icon',
      description: 'Reviewed 250 clubs',
      category: 'reviews',
    }
  },
  {
    threshold: 300,
    status: {
      id: 'supreme-critic',
      title: 'Supreme Critic',
      description: 'Reviewed 300 clubs',
      category: 'reviews',
    }
  },
  {
    threshold: 400,
    status: {
      id: 'midwest-michelin-inspector',
      title: "Midwest's Michelin Star Inspector",
      description: 'Reviewed 400+ clubs',
      category: 'reviews',
    }
  },
];

/**
 * Overall leaderboard status definitions (Midwest)
 */
export const overallLeaderboardStatuses: { rank: number; status: UserStatus }[] = [
  {
    rank: 1,
    status: {
      id: 'midwest-champion',
      title: 'Midwest Supper Club Champion',
      description: '#1 Overall Leaderboard',
      category: 'leaderboard',
    }
  },
  {
    rank: 2,
    status: {
      id: 'master-midwest-dining',
      title: 'Master of the Midwest Dining',
      description: '#2 Overall Leaderboard',
      category: 'leaderboard',
    }
  },
  {
    rank: 3,
    status: {
      id: 'supper-club-virtuoso',
      title: 'Supper Club Virtuoso',
      description: '#3 Overall Leaderboard',
      category: 'leaderboard',
    }
  },
  {
    rank: 4,
    status: {
      id: 'legendary-food-explorer',
      title: 'Legendary Food Explorer',
      description: '#4 Overall Leaderboard',
      category: 'leaderboard',
    }
  },
  {
    rank: 5,
    status: {
      id: 'supper-club-aficionado',
      title: 'Supper Club Aficionado',
      description: '#5 Overall Leaderboard',
      category: 'leaderboard',
    }
  },
  {
    rank: 6,
    status: {
      id: 'ultimate-food-traveler',
      title: 'Ultimate Food Traveler',
      description: '#6 Overall Leaderboard',
      category: 'leaderboard',
    }
  },
  {
    rank: 7,
    status: {
      id: 'epicurean-explorer',
      title: 'Epicurean Explorer',
      description: '#7 Overall Leaderboard',
      category: 'leaderboard',
    }
  },
  {
    rank: 8,
    status: {
      id: 'culinary-adventurer',
      title: 'Culinary Adventurer',
      description: '#8 Overall Leaderboard',
      category: 'leaderboard',
    }
  },
  {
    rank: 9,
    status: {
      id: 'food-trailblazer',
      title: 'Food Trailblazer',
      description: '#9 Overall Leaderboard',
      category: 'leaderboard',
    }
  },
  {
    rank: 10,
    status: {
      id: 'culinary-enthusiast',
      title: 'Culinary Enthusiast',
      description: '#10 Overall Leaderboard',
      category: 'leaderboard',
    }
  },
];

/**
 * Get state-specific leaderboard status
 * @param rank The user's leaderboard rank in the state
 * @param state The state name
 * @returns A UserStatus object or null if rank is invalid
 */
export const getStateLeaderboardStatus = (rank: number, state: string): UserStatus | null => {
  if (rank < 1 || rank > 10 || !state) return null;
  
  const stateStatuses = [
    {
      rank: 1,
      titleTemplate: '{state} Supper Club Champion',
      description: `#1 in {state} Leaderboard`,
    },
    {
      rank: 2,
      titleTemplate: 'Supper Club Aficionado of {state}',
      description: `#2 in {state} Leaderboard`,
    },
    {
      rank: 3,
      titleTemplate: '{state} Food Pioneer',
      description: `#3 in {state} Leaderboard`,
    },
    {
      rank: 4,
      titleTemplate: '{state} Culinary Leader',
      description: `#4 in {state} Leaderboard`,
    },
    {
      rank: 5,
      titleTemplate: '{state} Dining Enthusiast',
      description: `#5 in {state} Leaderboard`,
    },
    {
      rank: 6,
      titleTemplate: '{state} Culinary Trailblazer',
      description: `#6 in {state} Leaderboard`,
    },
    {
      rank: 7,
      titleTemplate: '{state} Food Explorer',
      description: `#7 in {state} Leaderboard`,
    },
    {
      rank: 8,
      titleTemplate: "{state}'s Food Hero",
      description: `#8 in {state} Leaderboard`,
    },
    {
      rank: 9,
      titleTemplate: "{state}'s Foodie",
      description: `#9 in {state} Leaderboard`,
    },
    {
      rank: 10,
      titleTemplate: '{state} Supper Club Traveler',
      description: `#10 in {state} Leaderboard`,
    },
  ];
  
  const statusTemplate = stateStatuses.find(s => s.rank === rank);
  if (!statusTemplate) return null;
  
  return {
    id: `state-${rank}-${state.toLowerCase().replace(/\s+/g, '-')}`,
    title: statusTemplate.titleTemplate.replace(/{state}/g, state),
    description: statusTemplate.description.replace(/{state}/g, state),
    category: 'leaderboard',
  };
};

/**
 * Get city-specific leaderboard status
 * @param rank The user's leaderboard rank in the city
 * @param city The city name
 * @returns A UserStatus object or null if rank is invalid
 */
export const getCityLeaderboardStatus = (rank: number, city: string): UserStatus | null => {
  if (rank < 1 || rank > 10 || !city) return null;
  
  const cityStatuses = [
    {
      rank: 1,
      titleTemplate: '{city} Supper Club Champion',
      description: `#1 in {city} Leaderboard`,
    },
    {
      rank: 2,
      titleTemplate: 'Supper Club Aficionado of {city}',
      description: `#2 in {city} Leaderboard`,
    },
    {
      rank: 3,
      titleTemplate: '{city} Foodie',
      description: `#3 in {city} Leaderboard`,
    },
    {
      rank: 4,
      titleTemplate: '{city} Supper Club Enthusiast',
      description: `#4 in {city} Leaderboard`,
    },
    {
      rank: 5,
      titleTemplate: 'Urban Food Explorer of {city}',
      description: `#5 in {city} Leaderboard`,
    },
    {
      rank: 6,
      titleTemplate: '{city} Dining Expert',
      description: `#6 in {city} Leaderboard`,
    },
    {
      rank: 7,
      titleTemplate: '{city} Culinary Star',
      description: `#7 in {city} Leaderboard`,
    },
    {
      rank: 8,
      titleTemplate: '{city} Food Traveler',
      description: `#8 in {city} Leaderboard`,
    },
    {
      rank: 9,
      titleTemplate: "{city}'s Local Dining Pioneer",
      description: `#9 in {city} Leaderboard`,
    },
    {
      rank: 10,
      titleTemplate: "{city}'s Food Trailblazer",
      description: `#10 in {city} Leaderboard`,
    },
  ];
  
  const statusTemplate = cityStatuses.find(s => s.rank === rank);
  if (!statusTemplate) return null;
  
  return {
    id: `city-${rank}-${city.toLowerCase().replace(/\s+/g, '-')}`,
    title: statusTemplate.titleTemplate.replace(/{city}/g, city),
    description: statusTemplate.description.replace(/{city}/g, city),
    category: 'leaderboard',
  };
};

/**
 * Get the highest status a user has earned based on priority hierarchy:
 * 1. Overall leaderboard status (if user is on overall leaderboard)
 * 2. State leaderboard status (if user is on state leaderboard)
 * 3. City leaderboard status (if user is on city leaderboard)
 * 4. Visit count status (fallback)
 * 
 * @param user The user profile
 * @param state Optional state name for state leaderboard lookup
 * @param stateRank Optional state rank for state leaderboard lookup
 * @param city Optional city name for city leaderboard lookup
 * @param cityRank Optional city rank for city leaderboard lookup
 * @returns The user's highest earned status
 */
export function getPrimaryUserStatus(
  user: UserProfile, 
  state?: string,
  stateRank?: number,
  city?: string,
  cityRank?: number
): UserStatus | null {
  // Check overall leaderboard status (priority 1)
  if (user.rank > 0 && user.rank <= 10) {
    const overallStatus = overallLeaderboardStatuses.find(s => s.rank === user.rank);
    if (overallStatus) {
      return overallStatus.status;
    }
  }

  // Check state leaderboard status (priority 2)
  if (state && stateRank && stateRank > 0 && stateRank <= 10) {
    const stateStatus = getStateLeaderboardStatus(stateRank, state);
    if (stateStatus) {
      return stateStatus;
    }
  }

  // Check city leaderboard status (priority 3)
  if (city && cityRank && cityRank > 0 && cityRank <= 10) {
    const cityStatus = getCityLeaderboardStatus(cityRank, city);
    if (cityStatus) {
      return cityStatus;
    }
  }

  // Fallback to visit-based status (priority 4)
  for (let i = visitStatuses.length - 1; i >= 0; i--) {
    if (user.totalVisits >= visitStatuses[i].threshold) {
      return visitStatuses[i].status;
    }
  }

  return null;
}

/**
 * Get all applicable statuses for a user based on their profile
 * @param user The user profile
 * @param reviewCount Number of reviews the user has written
 * @returns An array of user statuses
 */
export const getUserStatuses = (user: UserProfile, reviewCount: number = 0): UserStatus[] => {
  const statuses: UserStatus[] = [];
  
  // Add visit-based statuses
  for (let i = visitStatuses.length - 1; i >= 0; i--) {
    if (user.totalVisits >= visitStatuses[i].threshold) {
      // Find the next threshold to calculate progress
      const nextThreshold = i < visitStatuses.length - 1 ? visitStatuses[i + 1].threshold : visitStatuses[i].threshold * 1.5;
      
      // Create a copy of the status with progress information
      const statusWithProgress = {
        ...visitStatuses[i].status,
        progress: {
          current: user.totalVisits - visitStatuses[i].threshold,
          max: nextThreshold - visitStatuses[i].threshold
        }
      };
      
      statuses.push(statusWithProgress);
      break; // Only add the highest earned status
    }
  }
  
  // Add review-based statuses
  for (let i = reviewStatuses.length - 1; i >= 0; i--) {
    if (reviewCount >= reviewStatuses[i].threshold) {
      // Find the next threshold to calculate progress
      const nextThreshold = i < reviewStatuses.length - 1 ? reviewStatuses[i + 1].threshold : reviewStatuses[i].threshold * 1.5;
      
      // Create a copy of the status with progress information
      const statusWithProgress = {
        ...reviewStatuses[i].status,
        progress: {
          current: reviewCount - reviewStatuses[i].threshold,
          max: nextThreshold - reviewStatuses[i].threshold
        }
      };
      
      statuses.push(statusWithProgress);
      break; // Only add the highest earned status
    }
  }
  
  // Add leaderboard statuses
  // Overall leaderboard
  if (user.rank > 0 && user.rank <= 10) {
    const overallStatus = overallLeaderboardStatuses.find(s => s.rank === user.rank);
    if (overallStatus) {
      // For leaderboard statuses, progress is based on maintaining position
      // Simple placeholder for now
      const statusWithProgress = {
        ...overallStatus.status,
        progress: {
          current: 1,
          max: 1 // Max is 1 since you're already at the top
        }
      };
      
      statuses.push(statusWithProgress);
    }
  }
  
  // We would need user's state rank and city rank for those statuses
  // For now, we'll leave this as is
  
  return statuses;
};

/**
 * Get all potential statuses a user could earn
 * @returns An array of all possible user statuses
 */
export const getAllPossibleStatuses = (): UserStatus[] => {
  const allStatuses: UserStatus[] = [];
  
  // Visit statuses
  visitStatuses.forEach(({ status }) => {
    allStatuses.push(status);
  });
  
  // Review statuses
  reviewStatuses.forEach(({ status }) => {
    allStatuses.push(status);
  });
  
  // Overall leaderboard statuses
  overallLeaderboardStatuses.forEach(({ status }) => {
    allStatuses.push(status);
  });
  
  // Add examples of state and city statuses
  const exampleState = getStateLeaderboardStatus(1, 'Wisconsin');
  const exampleCity = getCityLeaderboardStatus(1, 'Madison');
  
  if (exampleState) allStatuses.push(exampleState);
  if (exampleCity) allStatuses.push(exampleCity);
  
  return allStatuses;
};
