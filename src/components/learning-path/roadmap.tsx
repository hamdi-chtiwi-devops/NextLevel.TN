
'use client';

import { YouTubePlaylist } from '@/lib/types';
import { Button } from '../ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import Link from 'next/link';
import { Youtube, Clock, Code, ShieldCheck, Database, Server } from 'lucide-react';
import { cn } from '@/lib/utils';

type Step = YouTubePlaylist & {
    icon?: React.ElementType;
};

interface RoadmapProps {
  title: string;
  description: string;
  category: string;
  steps: Step[];
}

const stepColors = [
  'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 border-blue-200 dark:border-blue-700/50',
  'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-300 border-yellow-200 dark:border-yellow-700/50',
  'bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-300 border-teal-200 dark:border-teal-700/50',
  'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 border-indigo-200 dark:border-indigo-700/50',
];

const stepIcon = (category: string) => {
    switch (category) {
        case 'Web Development':
            return Code;
        case 'Cybersecurity':
            return ShieldCheck;
        case 'Data Science':
            return Database;
        case 'DevOps':
            return Server;
        default:
            return Code;
    }
}

export function Roadmap({ title, description, category, steps }: RoadmapProps) {
    const PathIcon = stepIcon(category);

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex items-start gap-4">
            <div className="bg-primary/10 p-3 rounded-lg">
                 <PathIcon className="h-6 w-6 text-primary" />
            </div>
            <div>
                <Badge variant="secondary" className="w-fit mb-2">
                    {category}
                </Badge>
                <CardTitle className="text-2xl font-bold">{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </div>
        </div>
      </CardHeader>
      <div className="p-6 pt-0">
        <div className="relative">
          {/* Desktop Roadmap Path */}
          <div className="hidden md:block absolute top-10 left-1/2 w-px h-full bg-border -translate-x-1/2"></div>
          
          {steps.map((step, index) => {
            const isOdd = index % 2 !== 0;
            const colorClass = stepColors[index % stepColors.length];

            return (
              <div key={step.id} className={cn("relative flex md:items-center py-8", 
                isOdd ? "md:flex-row-reverse" : "md:flex-row"
              )}>
                {/* Content Card */}
                <div className={cn("w-full md:w-1/2", isOdd ? 'md:pr-[calc(50%+2rem)]' : 'md:pl-[calc(50%+2rem)]')}>
                  <div className={cn("p-6 rounded-xl border-2 transition-all hover:shadow-lg hover:-translate-y-1", colorClass)}>
                    <p className="font-bold text-lg mb-2">{step.title}</p>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm opacity-80 mb-3">
                      <span className="flex items-center gap-1.5">
                        <Youtube className="w-4 h-4" />
                        {step.author}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        {step.duration}
                      </span>
                    </div>
                    <Button asChild variant="secondary" size="sm" className="bg-white/50 dark:bg-black/20">
                      <Link href={step.url} target="_blank" rel="noopener noreferrer">
                        Watch on YouTube
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* Step Circle (Desktop) */}
                <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-16 w-16 rounded-full items-center justify-center font-bold text-2xl border-4 bg-background z-10 text-primary-foreground">
                    <div className={cn("absolute inset-0 rounded-full", colorClass.replace('bg-', 'bg-').replace('text-', 'text-').split(' ')[0].replace('100', '500').replace('900/30', '500'))}></div>
                    <span className="relative z-10">{index + 1}</span>
                </div>
                
                 {/* Step Circle (Mobile) */}
                 <div className="md:hidden absolute top-8 left-0 -translate-x-1/2 h-12 w-12 rounded-full flex items-center justify-center font-bold text-xl border-4 bg-background z-10 text-primary-foreground">
                    <div className={cn("absolute inset-0 rounded-full", colorClass.replace('bg-', 'bg-').replace('text-', 'text-').split(' ')[0].replace('100', '500').replace('900/30', '500'))}></div>
                    <span className="relative z-10">{index + 1}</span>
                </div>

                {/* Mobile vertical line */}
                <div className="md:hidden absolute top-0 left-0 w-px h-full bg-border -translate-x-1/2"></div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
