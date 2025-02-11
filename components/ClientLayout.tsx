'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Navigation from "@/components/homepage/Navigation";
import AuthLoader from '@/components/AuthLoader';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const auth = localStorage.getItem('gsk-auth');
    setIsAuthenticated(auth === 'true');
    setLoading(false);
  }, []);

  if (loading) {
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