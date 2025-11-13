import { useState, useEffect } from 'react';
import { fetchImage } from '../config/api';

export function useImageLoader(itemName: string) {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadImage = async () => {
      try {
        setIsLoading(true);
        const url = await fetchImage(itemName + ' waste');
        setImageUrl(url);
        setError(null);
      } catch (err) {
        console.error(`Error loading image for ${itemName}:`, err);
        setError(err instanceof Error ? err : new Error('Failed to load image'));
        setImageUrl('');
      } finally {
        setIsLoading(false);
      }
    };

    loadImage();
  }, [itemName]);

  return { imageUrl, isLoading, error };
}
