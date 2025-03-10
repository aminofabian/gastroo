"use client";
import { signIn } from 'next-auth/react';
import { useState } from 'react';

export function LoginButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await signIn('github', { callbackUrl: '/' });
      if (result?.error) {
        setError(result.error);
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Failed to login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button 
        onClick={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? 'Loading...' : 'Login'}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
