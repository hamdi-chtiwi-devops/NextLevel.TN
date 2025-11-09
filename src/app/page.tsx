
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
        // User is logged in, but we don't know their role yet.
        // The login/signup pages should have already redirected.
        // As a fallback, send them to the student dashboard.
        // A more robust app might check the role here again.
        router.push('/dashboard');
    }
  }, [user, router]);

  // Render a loading indicator while the auth state is being determined.
  return <div>Loading...</div>;
}
