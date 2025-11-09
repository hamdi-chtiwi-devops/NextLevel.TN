
'use client';

import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

/**
 * This hook redirects the user to the dashboard if they are already logged in.
 * It's useful for pages like login and signup that should not be accessible to authenticated users.
 */
export function useAuthRedirect() {
  const user = useUser();
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    // If auth is still loading, do nothing.
    if (user === undefined) {
      return;
    }
    
    // If user is logged in, redirect to the dashboard.
    if (user) {
      setIsRedirecting(true);
      router.push('/dashboard');
    }
  }, [user, router]);
  
  const isLoading = user === undefined || isRedirecting || !!user;

  return { isLoading };
}
