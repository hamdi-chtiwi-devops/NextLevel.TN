'use client';

import { YouTubePlaylist } from '@/lib/types';
import { Button } from '../ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import Link from 'next/link';
import { Youtube, Clock, Code, ShieldCheck, Database, Server } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TechIcon } from './tech-icon';

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
  'bg-blue-500/10 border-blue-500/30',
  'bg-yellow-500/10 border-yellow-500/30',
  'bg-teal-500/10 border-teal-500/30',
  'bg-indigo-500/10 border-indigo-500/30',
  'bg-pink-500/10 border-pink-500/30',
  'bg-orange-500/10 border-orange-500/30',
];

const categoryIcon = (category: string) => {
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
    const PathIcon = categoryIcon(category);

  return (
    <Card className="overflow-hidden border-2 shadow-sm">
      <CardHeader className="bg-muted/30 border-b-2 p-6">
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
          <div className="absolute left-5 w-0.5 h-full bg-border top-0" aria-hidden="true"></div>
          
          <div className="space-y-12">
            {steps.map((step, index) => {
              const colorClass = stepColors[index % stepColors.length];

              return (
                <div key={step.id} className="relative flex items-start gap-6">
                  {/* Step Circle */}
                  <div className="relative z-10 flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg ring-8 ring-background">
                          {index + 1}
                      </div>
                  </div>

                  {/* Content Card */}
                  <div className={cn("w-full rounded-xl border p-4 transition-all hover:shadow-md hover:-translate-y-0.5", colorClass)}>
                      <div className="flex items-center gap-4 mb-2">
                        <TechIcon title={step.title} />
                        <p className="font-bold font-headline text-lg text-foreground">{step.title}</p>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground mb-3 pl-10">
                        <span className="flex items-center gap-1.5">
                          <Youtube className="w-4 h-4" />
                          {step.author}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4" />
                          {step.duration}
                        </span>
                      </div>
                      <div className="pl-10">
                        <Button asChild variant="secondary" size="sm" className="bg-background/70 border">
                            <Link href={step.url} target="_blank" rel="noopener noreferrer">
                            Watch on YouTube
                            </Link>
                        </Button>
                      </div>
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
