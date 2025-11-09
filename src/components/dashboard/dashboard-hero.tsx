
'use client';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { findImage } from '@/lib/placeholder-images';

export function DashboardHero() {
  const heroImage = findImage('dashboard-hero-1');

  return (
    <Carousel
      className="w-full"
      opts={{
        align: 'start',
        loop: true,
      }}
    >
      <CarouselContent>
        <CarouselItem>
          <Card className="overflow-hidden border-none bg-transparent">
            <div className="grid md:grid-cols-2 items-center">
              <div className="p-8 md:p-12 order-2 md:order-1">
                <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">
                  Go further in web development
                </h2>
                <p className="text-muted-foreground mb-6">
                  Subscribe to a collection of our top courses in Javascript,
                  CSS, React, and more with Personal Plan.
                </p>
                <Button size="lg">Get started</Button>
              </div>
              <div className="relative order-1 md:order-2 h-64 md:h-full min-h-[300px]">
                <div className="absolute inset-0 bg-gradient-to-l from-background to-transparent md:hidden"></div>
                 <Image
                  src={heroImage}
                  alt="A smiling student holding a laptop"
                  fill
                  className="object-cover"
                  data-ai-hint="smiling student"
                />
                <div className="absolute inset-y-0 right-0 w-1/4 bg-background hidden md:block"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
              </div>
            </div>
          </Card>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
      <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
    </Carousel>
  );
}
