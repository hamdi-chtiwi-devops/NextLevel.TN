
'use client';

import { useUser, useFirestore } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function RootPage() {
  const user = useUser();
  const firestore = useFirestore();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This effect should only run on the client
    if (typeof window === 'undefined') {
      return;
    }

    if (user === undefined) {
      // Auth state is still loading, wait.
      return;
    }

    setLoading(false);

    if (user === null) {
      // User is not logged in, send to login page.
      router.push('/login');
      return;
    }

    if (user && firestore) {
      // User is logged in, check their role.
      const userDocRef = doc(firestore, 'users', user.uid);
      getDoc(userDocRef).then((docSnap) => {
        if (docSnap.exists() && docSnap.data().role === 'Admin') {
          router.push('/admin/dashboard');
        } else {
          // Default to student dashboard if role is not Admin or doc doesn't exist
          router.push('/dashboard');
        }
      }).catch(() => {
        // If there's an error fetching the doc, still redirect to a safe default.
        router.push('/dashboard');
      });
    }

  }, [user, firestore, router]);

  if (loading) {
    return <div>Loading...</div>;
  }
  
  // Render nothing while redirecting
  return null;
}
