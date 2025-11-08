import React from 'react';

export function Logo({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <div className="flex items-center justify-center gap-2" >
        <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        {...props}
        >
        <path
            d="M16 3L3 9.75V22.25L16 29L29 22.25V9.75L16 3Z"
            className="fill-primary"
        />
        <path
            d="M16 13.5L29 20V22.25L16 29V13.5Z"
            className="fill-primary/70"
        />
        <path
            d="M9.5 13.125L16 16.5L22.5 13.125V18.375L16 21.75L9.5 18.375V13.125Z"
            fill="white"
        />
        </svg>
        <span className="text-2xl font-bold font-headline text-foreground">NextLevel.TN</span>
    </div>

  );
}
