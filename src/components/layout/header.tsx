'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Search,
  Bell,
  Menu,
  BookOpen,
  LayoutDashboard,
  Users,
  Shield,
} from 'lucide-react';
import { UserNav } from './user-nav';
import { Logo } from '@/components/logo';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useUser, useFirestore } from '@/firebase';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/courses', label: 'Courses', icon: BookOpen },
  { href: '/community', label: 'Community', icon: Users },
];

const adminNavItem = { href: '/admin/dashboard', label: 'Admin', icon: Shield };

export function Header() {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const user = useUser();
  const firestore = useFirestore();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user && firestore) {
      const userDocRef = doc(firestore, 'users', user.uid);
      getDoc(userDocRef).then((docSnap) => {
        if (docSnap.exists() && docSnap.data().role === 'Admin') {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      });
    } else {
      setIsAdmin(false);
    }
  }, [user, firestore]);

  const allNavItems = isAdmin ? [...navItems, adminNavItem] : navItems;

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
      <div className="flex items-center gap-4">
        {isMobile ? (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="/dashboard"
                  className="mb-4 flex items-center gap-2 text-lg font-semibold"
                >
                  <Logo /> <span className="text-xl font-bold font-headline">NextLevel.TN</span>
                </Link>
                {allNavItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                      (pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))) && 'bg-muted text-primary'
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        ) : (
           <Link href="/dashboard" className="flex items-center gap-0">
            <Logo />
            <span className="text-xl font-bold font-headline hidden lg:inline-block">NextLevel.TN</span>
          </Link>
        )}
      </div>

      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6 ml-6">
        {allNavItems.map((item) => (
            <Link
                key={item.href}
                href={item.href}
                className={cn(
                    'transition-colors hover:text-foreground font-medium flex items-center gap-2',
                    (pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))) ? 'text-foreground' : 'text-muted-foreground'
                )}
            >
                {item.label}
                {item.href.startsWith('/admin') && <item.icon className="h-4 w-4" />}
            </Link>
        ))}
      </nav>

      <div className="ml-auto flex items-center gap-2">
        <form className="relative ml-auto hidden flex-1 sm:flex-initial md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="w-full bg-background pl-9 md:w-[200px] lg:w-[320px]"
            placeholder="Search courses..."
          />
        </form>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full md:hidden"
        >
          <Search className="h-5 w-5" />
          <span className="sr-only">Search</span>
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Toggle notifications</span>
        </Button>
        <UserNav />
      </div>
    </header>
  );
}
