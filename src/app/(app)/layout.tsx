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
    // Only perform redirection on the client side after the user status is determined.
    if (isClient && user === null) {
      router.push('/login');
    }
  }, [user, router, isClient]);

  // While waiting for the client to determine the auth state, show a loading indicator.
  // This prevents content from flashing before a redirect.
  if (!isClient || user === undefined) {
    return <div>Loading...</div>;
  }

  // If the user is logged out, the useEffect above will trigger a redirect.
  // Show a loading state during the brief redirect period.
  if (user === null) {
    return <div>Loading...</div>;
  }

  // If we reach this point, the user is authenticated. Render the app.
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
    </div>
  );
}
