
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
    if (!user || !firestore || hasRedirected) {
        if (user === null) {
            router.push('/login');
        }
      return;
    }

    const userDocRef = doc(firestore, 'users', user.uid);
    getDoc(userDocRef).then((docSnap) => {
      setHasRedirected(true);
      if (docSnap.exists() && docSnap.data().role === 'Admin') {
        router.push('/admin/dashboard');
      } else {
        router.push('/dashboard');
      }
    }).catch(() => {
        setHasRedirected(true);
        router.push('/dashboard');
    });

  }, [user, firestore, router, hasRedirected]);

  return <div>Loading...</div>;
}
