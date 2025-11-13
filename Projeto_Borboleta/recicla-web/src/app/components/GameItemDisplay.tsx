import { useImageLoader } from '../hooks/useImageLoader';
import { GameItem } from '../types';

interface GameItemDisplayProps {
  item: GameItem;
  className?: string;
}

export function GameItemDisplay({ item, className = '' }: GameItemDisplayProps) {
  const { imageUrl, isLoading, error } = useImageLoader(item.name);

  if (isLoading) {
    return (
      <div className={`game-item ${className} flex items-center justify-center bg-gray-100 rounded-lg p-4`}>
        <div className="animate-pulse w-16 h-16 bg-gray-300 rounded"></div>
      </div>
    );
  }

  if (error || !imageUrl) {
    // Fallback to emoji if image loading fails
    return (
      <div className={`game-item ${className} flex items-center justify-center text-5xl bg-white rounded-lg p-4`}>
        {item.item}
      </div>
    );
  }

  return (
    <div className={`game-item ${className} flex items-center justify-center`}>
      <img 
        src={imageUrl} 
        alt={item.name}
        className="max-w-full max-h-24 object-contain rounded-lg"
        onError={(e) => {
          // Fallback to emoji if image fails to load
          const target = e.target as HTMLImageElement;
          target.outerHTML = `<div class="flex items-center justify-center text-5xl bg-white rounded-lg p-4">${item.item}</div>`;
        }}
      />
    </div>
  );
}
