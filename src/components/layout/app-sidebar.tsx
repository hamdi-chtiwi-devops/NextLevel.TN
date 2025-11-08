'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Logo } from '@/components/logo';
import {
  LayoutDashboard,
  BookOpen,
  Users,
  Settings,
  LogOut,
  ChevronUp,
} from 'lucide-react';
import { mockUser } from '@/lib/data';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '../ui/button';

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/courses', label: 'Courses', icon: BookOpen },
  { href: '/community', label: 'Community', icon: Users },
];

const bottomMenuItems = [
    { href: '/profile', label: 'Settings', icon: Settings },
]

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <>
      <SidebarHeader>
        <div className="p-2">
            <Logo />
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))}
                tooltip={{ children: item.label }}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-4 mt-auto">
        <SidebarMenu>
          {bottomMenuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname.startsWith(item.href)}
                tooltip={{ children: item.label }}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <SidebarSeparator className="my-2" />
        <Popover>
            <PopoverTrigger asChild>
                <button className="flex items-center gap-3 rounded-lg p-2 text-sm font-medium text-sidebar-foreground w-full hover:bg-sidebar-accent transition-colors">
                    <Avatar className="h-9 w-9">
                        <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
                        <AvatarFallback>{mockUser.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start truncate group-data-[collapsible=icon]:hidden">
                        <span className="font-semibold">{mockUser.name}</span>
                        <span className="text-xs text-muted-foreground">{mockUser.role}</span>
                    </div>
                    <ChevronUp className="ml-auto h-4 w-4 shrink-0 opacity-50 group-data-[collapsible=icon]:hidden" />
                </button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-1 mb-2">
                 <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link href="/login">
                                <LogOut />
                                <span>Log out</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                 </SidebarMenu>
            </PopoverContent>
        </Popover>
      </SidebarFooter>
    </>
  );
}
