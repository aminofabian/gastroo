'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import Navigation from "@/components/homepage/Navigation";
import AuthLoader from '@/components/AuthLoader';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    const checkAuth = async () => {
      const auth = localStorage.getItem('gsk-auth');
      const localAuthValid = auth === 'true';
      
      // For pages that require Next.js auth (like dashboard), check session
      const isAuthProtectedPage = pathname.includes('/dashboard');
      
      if (isAuthProtectedPage && status === 'unauthenticated') {
        // Redirect to login if trying to access protected page without session
        router.push('/auth/login');
        return;
      }
      
      setIsAuthenticated(localAuthValid);
      setLoading(false);
    };
    
    if (status !== 'loading') {
      checkAuth();
    }
  }, [pathname, status, router]);

  if (loading || status === 'loading') {
    return null;
  }

  if (!isAuthenticated) {
    return <AuthLoader onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  return (
    <>
      {!pathname.includes('/dashboard') && <Navigation />}
      {children}
    </>
  );
} 