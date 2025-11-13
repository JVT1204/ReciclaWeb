'use client';

import { useEffect, useState } from 'react';
import { fetchImage } from '../config/api';

export function TestApi() {
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const testApi = async () => {
      try {
        setLoading(true);
        const url = await fetchImage('plastic bottle');
        setImageUrl(url);
        setError('');
      } catch (err) {
        console.error('API Test Error:', err);
        setError(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
      } finally {
        setLoading(false);
      }
    };

    testApi();
  }, []);

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg max-w-xs">
      <h3 className="font-bold mb-2">API Test</h3>
      {loading && <p>Testing API connection...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {imageUrl && (
        <div>
          <p className="text-green-600">API is working! 🎉</p>
          <img 
            src={imageUrl} 
            alt="Test from Pexels" 
            className="mt-2 rounded w-full h-32 object-cover"
          />
        </div>
      )}
      {!process.env.NEXT_PUBLIC_PEXELS_API_KEY && (
        <p className="text-yellow-600 mt-2">
          Warning: NEXT_PUBLIC_PEXELS_API_KEY is not set in .env.local
        </p>
      )}
    </div>
  );
}
