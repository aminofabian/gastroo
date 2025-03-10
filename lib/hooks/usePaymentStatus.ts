import { useState, useEffect } from 'react';
import { checkPaymentStatus } from '@/lib/pesapal';

export function usePaymentStatus(orderTrackingId: string | undefined) {
  const [isPaid, setIsPaid] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    if (!orderTrackingId) return;

    let isMounted = true;
    
    const checkStatus = async () => {
      if (!isMounted) return false;
      
      try {
        setIsChecking(true);
        const statusResponse = await checkPaymentStatus(orderTrackingId);
        
        if (!isMounted) return false;
        
        setStatus(statusResponse.status);
        
        if (statusResponse.status === 'COMPLETED') {
          setIsPaid(true);
          return true; // Stop polling
        }
        return false; // Continue polling
      } catch (error: any) {
        if (!isMounted) return false;
        
        console.error('Payment status check error:', error);
        setError(error.message);
        
        // Don't stop polling on network errors, only on validation errors
        return error.message.includes('Invalid') || error.message.includes('not found');
      } finally {
        if (isMounted) {
          setIsChecking(false);
        }
      }
    };

    // Poll every 5 seconds
    const interval = setInterval(async () => {
      const shouldStop = await checkStatus();
      if (shouldStop && isMounted) {
        clearInterval(interval);
      }
    }, 5000);

    // Initial check
    checkStatus();

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [orderTrackingId]);

  return { isPaid, isChecking, error, status };
} 