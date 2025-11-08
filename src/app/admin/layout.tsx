
'use client';

import { useUser, useFirestore } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Header } from '@/components/layout/header';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = useUser();
  const firestore = useFirestore();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user === null) {
      // Not logged in, redirect to login
      router.push('/login');
      return;
    }

    if (user && firestore) {
      const userDocRef = doc(firestore, 'users', user.uid);
      getDoc(userDocRef).then((docSnap) => {
        if (docSnap.exists() && docSnap.data().role === 'Admin') {
          setIsAdmin(true);
        } else {
          // Not an admin, redirect to student dashboard
          router.push('/dashboard');
        }
        setLoading(false);
      });
    } else if (user === undefined) {
      // Still waiting for auth state
    } else {
      // User is defined but firestore isn't ready or some other issue
      setLoading(false);
      router.push('/login');
    }
  }, [user, firestore, router]);

  if (loading || !isAdmin) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
    </div>
  );
}
