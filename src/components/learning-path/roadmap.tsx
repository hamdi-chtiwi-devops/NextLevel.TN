
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
  'border-blue-300/80 bg-blue-50/50 dark:border-blue-800/60 dark:bg-blue-950/30',
  'border-yellow-300/80 bg-yellow-50/50 dark:border-yellow-800/60 dark:bg-yellow-950/30',
  'border-teal-300/80 bg-teal-50/50 dark:border-teal-800/60 dark:bg-teal-950/30',
  'border-indigo-300/80 bg-indigo-50/50 dark:border-indigo-800/60 dark:bg-indigo-950/30',
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
    <Card className="overflow-hidden border-2 shadow-sm">
      <CardHeader className="bg-muted/30 border-b-2">
        <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="bg-primary/10 p-3 rounded-lg border">
                 <PathIcon className="h-6 w-6 text-primary" />
            </div>
            <div>
                <Badge variant="secondary" className="w-fit mb-2">
                    {category}
                </Badge>
                <CardTitle className="text-2xl font-bold font-headline">{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </div>
        </div>
      </CardHeader>
      <div className="p-6 md:p-8">
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 w-0.5 h-full bg-border -translate-x-1/2" aria-hidden="true"></div>
          
          <div className="space-y-12">
            {steps.map((step, index) => {
              const colorClass = stepColors[index % stepColors.length];

              return (
                <div key={step.id} className="relative flex items-start gap-6">
                  {/* Step Circle */}
                  <div className="relative z-10 flex-shrink-0">
                      <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm ring-8 ring-background">
                          {index + 1}
                      </div>
                  </div>

                  {/* Content Card */}
                  <div className={cn("w-full rounded-xl border-2 p-4 transition-all hover:shadow-md hover:-translate-y-0.5", colorClass)}>
                      <p className="font-bold font-headline text-lg mb-2 text-foreground">{step.title}</p>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center gap-1.5">
                          <Youtube className="w-4 h-4" />
                          {step.author}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4" />
                          {step.duration}
                        </span>
                      </div>
                      <Button asChild variant="secondary" size="sm" className="bg-background/70 border">
                        <Link href={step.url} target="_blank" rel="noopener noreferrer">
                          Watch on YouTube
                        </Link>
                      </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Card>
  );
}
