
'use client';

import { useUser, useFirestore } from '@/firebase';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState, type ReactNode } from 'react';
import { Header } from '@/components/layout/header';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseClientProvider } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';

function AppContent({ children }: { children: ReactNode }) {
  const user = useUser();
  const firestore = useFirestore();
  const router = useRouter();
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/signup');
  const isAdminPage = pathname.startsWith('/admin');
  const isPublicPage = isAuthPage;

  useEffect(() => {
    if (!isClient) return;

    if (user === null && !isPublicPage) {
      router.push('/login');
      return;
    }

    if (user && firestore && !isAdminPage) {
      const userDocRef = doc(firestore, 'users', user.uid);
      getDoc(userDocRef).then((docSnap) => {
        if (docSnap.exists() && docSnap.data().role === 'Admin') {
          router.push('/admin/dashboard');
        }
      });
    }

  }, [isClient, user, firestore, isPublicPage, isAdminPage, router, pathname]);

  if (user === undefined && !isPublicPage) {
    return <div>Loading...</div>; // Show loading screen while user state is being determined
  }

  return (
    <>
      {isAuthPage || isAdminPage ? (
        children
      ) : (
        <div className="flex min-h-screen flex-col bg-background">
          <Header />
          <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      )}
      <Toaster />
    </>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <title>NextLevel.TN</title>
        <meta name="description" content="A modern, intelligent, and fully managed e-learning platform." />
      </head>
      <body className="font-body antialiased">
        <FirebaseClientProvider>
          <AppContent>{children}</AppContent>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
