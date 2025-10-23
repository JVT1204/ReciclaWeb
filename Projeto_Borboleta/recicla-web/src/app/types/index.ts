export interface TrashType {
  id: string;
  icon: string;
  title: string;
  color: string;
  description: string;
  tip: string;
}

export interface GameItem {
  item: string;
  type: string;
  name: string;
}

export interface TeamMember {
  name: string;
  ra: string;
  role: string;
  avatar: string;
}

export interface GameState {
  score: number;
  currentItem: GameItem | null;
  gameItems: GameItem[];
  isGameActive: boolean;
}

export interface CarouselState {
  currentSlide: number;
  totalSlides: number;
}