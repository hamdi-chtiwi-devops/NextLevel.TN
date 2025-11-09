
'use client';

import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function RootPage() {
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user === undefined) {
      // Auth state is still loading, wait.
      return;
    }

    if (user === null) {
      // User is not logged in, send to login page.
      router.push('/login');
    } else {
      router.push('/dashboard');
    }
  }, [user, router]);

  // Render a loading indicator while the auth state is being determined.
  return <div>Loading...</div>;
}
