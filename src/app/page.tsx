
'use client';

import { useUser, useFirestore } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function RootPage() {
  const user = useUser();
  const firestore = useFirestore();
  const router = useRouter();
  const [hasRedirected, setHasRedirected] = useState(false);

  useEffect(() => {
    // Prevent multiple redirects
    if (hasRedirected) {
      return;
    }

    if (user === undefined) {
      // Auth state is still loading, wait.
      return;
    }

    if (user === null) {
      // User is not logged in, send to login page.
      setHasRedirected(true);
      router.push('/login');
      return;
    }

    if (user && firestore) {
      // User is logged in, check their role.
      const userDocRef = doc(firestore, 'users', user.uid);
      getDoc(userDocRef).then((docSnap) => {
        setHasRedirected(true);
        if (docSnap.exists() && docSnap.data().role === 'Admin') {
          router.push('/admin/dashboard');
        } else {
          // Default to student dashboard if role is not Admin or doc doesn't exist
          router.push('/dashboard');
        }
      }).catch(() => {
        // If there's an error fetching the doc, still redirect to a safe default.
        setHasRedirected(true);
        router.push('/dashboard');
      });
    }

  }, [user, firestore, router, hasRedirected]);

  return <div>Loading...</div>;
}
