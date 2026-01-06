
export type ContentCategory = 'Game' | 'Blog';

export interface Game {
  id: string;
  title: string;
  description: string;
  version: string;
  size: string;
  rating: number;
  icon: string;
  banner?: string;
  genre: string;
  modFeatures: string;
  category: ContentCategory;
}

export interface Blog {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  tag: string;
}

export interface SiteData {
  featured: Game[];
  updatedGames: Game[];
  newGames: Game[];
  blogs: Blog[];
  categories: string[];
}
