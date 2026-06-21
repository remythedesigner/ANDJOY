export interface Event {
  id: string;
  image: string;
  category: string;
  title: string;
  date: string;
  location: string;
  price: string;
  originalPrice?: string;
  badge?: string;
  badgeVariant?: 'scarcity' | 'new';
}

export interface Review {
  id: string;
  author: string;
  authorImage: string;
  authorGradient: string;
  timeAgo: string;
  emoji: string;
  text: string;
  eventTitle: string;
  eventImage: string;
}

export interface CommunityMember {
  id: string;
  name: string;
  image: string;
  gradient: string;
  bio: string;
  tags: string[];
  gender: 'male' | 'female';
  instagram?: string;
}

export interface HeroEvent {
  image: string;
  overlay: string;
  category: string;
  title: string;
  time: string;
  location: string;
  price: string;
  originalPrice?: string;
  scarcityBadge?: string;
  progressBars: number;
  activeBar: number;
}
