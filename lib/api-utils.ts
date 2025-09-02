/**
 * Utility functions for API calls and URL resolution
 */

/**
 * Get the base URL for API calls, handling different environments
 */
export function getBaseUrl(): string {
  // In server-side context (Node.js)
  if (typeof window === 'undefined') {
    // Production: Use environment variables
    if (process.env.NEXTAUTH_URL) {
      return process.env.NEXTAUTH_URL;
    }
    
    if (process.env.NEXT_PUBLIC_APP_URL) {
      return process.env.NEXT_PUBLIC_APP_URL;
    }
    
    // Vercel deployment
    if (process.env.VERCEL_URL) {
      return `https://${process.env.VERCEL_URL}`;
    }
    
    // Development fallback
    return 'http://localhost:3000';
  }
  
  // Client-side: Use current origin
  return window.location.origin;
}

/**
 * Make a server-side API call with proper error handling
 */
export async function serverFetch(endpoint: string, options?: RequestInit) {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
  
  console.log(`[SERVER_FETCH] Making request to: ${url}`);
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });
    
    console.log(`[SERVER_FETCH] Response status: ${response.status}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[SERVER_FETCH] Error response:`, errorText);
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    return response;
  } catch (error) {
    console.error(`[SERVER_FETCH] Network error:`, error);
    throw error;
  }
}
