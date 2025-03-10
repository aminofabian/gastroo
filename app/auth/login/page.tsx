"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogin = async (provider: string) => {
    try {
      setIsLoading(true);
      await signIn(provider, {
        callbackUrl: '/',
      });
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="space-y-4">
        <button
          onClick={() => handleLogin('github')}
          disabled={isLoading}
          className="p-2 border rounded-md"
        >
          {isLoading ? 'Loading...' : 'Sign in with GitHub'}
        </button>
        
        <button
          onClick={() => handleLogin('google')}
          disabled={isLoading}
          className="p-2 border rounded-md"
        >
          {isLoading ? 'Loading...' : 'Sign in with Google'}
        </button>
      </div>
    </div>
  );
}
