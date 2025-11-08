'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/components/ui/sidebar';

export function Logo({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  const { state } = useSidebar();
  
  return (
    <div className={cn(
        "flex items-center gap-2", 
        state === 'collapsed' ? 'justify-center' : ''
    )}>
        <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("text-primary", className)}
        {...props}
        >
        <path
            d="M16 3L3 9.75V22.25L16 29L29 22.25V9.75L16 3Z"
            fill="currentColor"
        />
        <path
            d="M16 13.5L29 20V22.25L16 29V13.5Z"
            className="text-primary/70"
            fill="currentColor"
        />
        <path
            d="M9.5 13.125L16 16.5L22.5 13.125V18.375L16 21.75L9.5 18.375V13.125Z"
            fill="white"
        />
        </svg>
        {state === 'expanded' && (
            <span className="text-2xl font-bold font-headline text-foreground">NextLevel.TN</span>
        )}
    </div>

  );
}
