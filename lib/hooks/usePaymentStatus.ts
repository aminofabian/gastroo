import { useState, useEffect } from 'react';
import { checkPaymentStatus } from '@/lib/pesapal';

export function usePaymentStatus(orderTrackingId: string | undefined) {
  const [isPaid, setIsPaid] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!orderTrackingId) return;

    const checkStatus = async () => {
      try {
        setIsChecking(true);
        const status = await checkPaymentStatus(orderTrackingId);
        
        if (status.status === 'COMPLETED') {
          setIsPaid(true);
          return true; // Stop polling
        }
        return false; // Continue polling
      } catch (error: any) {
        setError(error.message);
        return true; // Stop polling on error
      } finally {
        setIsChecking(false);
      }
    };

    // Poll every 5 seconds
    const interval = setInterval(async () => {
      const shouldStop = await checkStatus();
      if (shouldStop) {
        clearInterval(interval);
      }
    }, 5000);

    // Initial check
    checkStatus();

    return () => clearInterval(interval);
  }, [orderTrackingId]);

  return { isPaid, isChecking, error };
} 