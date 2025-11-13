// Get your API key from https://www.pexels.com/api/
// Make sure to set NEXT_PUBLIC_PEXELS_API_KEY in your .env.local file

const PEXELS_API_KEY = process.env.NEXT_PUBLIC_PEXELS_API_KEY;
const PEXELS_API_URL = 'https://api.pexels.com/v1/';

if (!PEXELS_API_KEY) {
  console.warn('Pexels API key is not set. Please set NEXT_PUBLIC_PEXELS_API_KEY in your .env.local file.');
}

// Cache for storing fetched images to avoid multiple API calls
const imageCache: Record<string, string> = {};

export async function fetchImage(query: string): Promise<string> {
  // Check if we already have this image in cache
  if (imageCache[query]) {
    return imageCache[query];
  }

  try {
    if (!PEXELS_API_KEY) {
      throw new Error('Pexels API key is not configured');
    }

    const response = await fetch(
      `${PEXELS_API_URL}search?query=${encodeURIComponent(query)}&per_page=1`,
      {
        headers: {
          Authorization: PEXELS_API_KEY,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch image');
    }

    const data = await response.json();
    const imageUrl = data.photos[0]?.src?.medium;
    
    if (!imageUrl) {
      throw new Error('No image found');
    }

    // Cache the image URL
    imageCache[query] = imageUrl;
    return imageUrl;
  } catch (error) {
    console.error('Error fetching image:', error);
    // Return a placeholder image or empty string if the API call fails
    return '';
  }
}
