'use client';

import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const user = useUser();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Only redirect if we are on the client and the user object is defined (not undefined)
    if (isClient && user) {
      router.push('/dashboard');
    }
  }, [user, router, isClient]);
  
  // While waiting for the client to mount and user status to be known, show a loading state.
  if (!isClient || user === undefined) {
    return <div>Loading...</div>; // Or a proper loading spinner
  }

  // If the user is logged in, they will be redirected. In the meantime, show loading.
  if (user) {
    return <div>Loading...</div>;
  }

  // Only render children if on the client and the user is confirmed to be logged out.
  return <>{children}</>;
}
