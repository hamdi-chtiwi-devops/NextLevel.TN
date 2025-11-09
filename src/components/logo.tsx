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
            <path
                d="M62.5,25C52.5,25 45,40 45,50C45,60 52.5,75 62.5,75"
                stroke="#1E88E5"
                strokeWidth="15"
                strokeLinecap="round"
                fill="none"
            />
            <path
                d="M37.5,75C47.5,75 55,60 55,50C55,40 47.5,25 37.5,25"
                stroke="#FF8F00"
                strokeWidth="15"
                strokeLinecap="round"
                fill="none"
            />
             <path
                d="M45,50 C45,57.5 49,65 55,65"
                stroke="#1565C0"
                strokeWidth="15"
                strokeLinecap="round"
                fill="none"
            />
        </g>
      </svg>
    </div>
  );
}
