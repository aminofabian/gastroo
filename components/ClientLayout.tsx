'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import Navigation from "@/components/homepage/Navigation";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    const checkAuth = async () => {
      // For pages that require Next.js auth (like dashboard), check session
      const isAuthProtectedPage = pathname.includes('/dashboard');
      
      if (isAuthProtectedPage && status === 'unauthenticated') {
        // Redirect to login if trying to access protected page without session
        router.push('/auth/login');
        return;
      }
      
      setLoading(false);
    };
    
    if (status !== 'loading') {
      checkAuth();
    }
  }, [pathname, status, router]);

  if (loading || status === 'loading') {
    return null;
  }

  return (
    <>
      {!pathname.includes('/dashboard') && <Navigation />}
      {children}
    </>
  );
} 