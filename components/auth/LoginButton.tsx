"use client";
import { signIn } from 'next-auth/react';
import { useRouter } from "next/navigation";
import { useState } from 'react';

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

function LoginButton({
  children,
  mode = "redirect",
  asChild,
}: LoginButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onClick = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      if (mode === "modal") {
        const result = await signIn('github', { callbackUrl: '/' });
        if (result?.error) {
          setError(result.error);
        }
      } else {
        router.push("/auth/login");
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
      <span 
        onClick={onClick}
        style={{ cursor: 'pointer' }}
        className={isLoading ? 'opacity-50' : ''}
      >
        {isLoading ? 'Loading...' : children}
      </span>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}

export default LoginButton;
