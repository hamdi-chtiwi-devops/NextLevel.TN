
'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { Header } from '@/components/layout/header';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseClientProvider } from '@/firebase';

function AppContent({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  
  const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/signup');
  const isRootPage = pathname === '/';

  // Only show the main layout for non-auth and non-admin pages
  const showMainLayout = !isAuthPage && !isRootPage;

  return (
    <>
      {showMainLayout ? (
        <div className="flex min-h-screen flex-col bg-background">
          <Header />
          <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      ) : (
        children
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
