'use client';

import { Header } from '@/components/layout/header';
import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const user = useUser();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && user === null) {
      router.push('/login');
    }
  }, [user, router, isClient]);
  
  if (!isClient || user === undefined) {
    return <div>Loading...</div>; // Or a proper loading spinner
  }

  if (user === null) {
    // This state is transient while the redirect happens.
    // Return a loading indicator to prevent rendering children.
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
    </div>
  );
}
