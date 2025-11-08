'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export function Logo({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <div className="flex items-center gap-2">
      <svg
        width="48"
        height="48"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(className)}
        {...props}
      >
        <g>
          {/* Central Blue Arrow */}
          <path d="M50 15 L62 40 L50 40 L50 65 L49 65 L49 40 L38 40 Z" fill="#25A0E8" />
          
          {/* Left dark shape */}
          <path d="M36 42 L36 68 L25 58 Z" fill="#1E2A4D" />
          
          {/* Left orange shape */}
          <path d="M38 42 L38 65 L30 59 Z" fill="#F37F30" />
          
          {/* Right dark shape */}
          <path d="M64 42 L64 68 L75 58 Z" fill="#1E2A4D" />
          
          {/* Right orange shape */}
          <path d="M62 42 L62 65 L70 59 Z" fill="#F37F30" />

          {/* Bottom orange V */}
          <path d="M45 88 L50 82 L55 88 L52 88 L50 85 L48 88 Z" fill="#F37F30" />
        </g>
      </svg>
    </div>
  );
}
