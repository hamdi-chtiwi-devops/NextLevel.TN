
'use client';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { Card } from '@/components/ui/card';
import { findImage } from '@/lib/placeholder-images';

const motivationalSlides = [
    {
      id: 'slide1',
      title: 'The journey of a thousand miles begins with a single step.',
      subtitle: 'Start a new course today and unlock your potential.',
      image: findImage('dashboard-hero-1'),
      imageHint: 'person coding',
    },
    {
      id: 'slide2',
      title: 'Knowledge is power.',
      subtitle: 'Every module you complete makes you stronger.',
      image: findImage('dashboard-hero-2'),
      imageHint: 'glowing lightbulb',
    },
    {
      id: 'slide3',
      title: 'Learn, Grow, Succeed.',
      subtitle: 'Our platform is designed to help you achieve your goals.',
      image: findImage('dashboard-hero-3'),
      imageHint: 'person learning',
    },
  ];

export function DashboardHero() {
  return (
    <Carousel
      className="w-full"
      plugins={[
        Autoplay({
          delay: 5000,
          stopOnInteraction: true,
        }),
      ]}
      opts={{
        align: 'start',
        loop: true,
      }}
    >
      <CarouselContent>
        {motivationalSlides.map((slide) => (
             <CarouselItem key={slide.id}>
                <Card className="overflow-hidden border-2 rounded-xl shadow-lg">
                    <div className="grid md:grid-cols-2 items-center bg-card">
                        <div className="p-8 md:p-12 order-2 md:order-1">
                            <h2 className="text-2xl md:text-3xl font-bold font-headline mb-3 leading-tight">
                            {slide.title}
                            </h2>
                            <p className="text-muted-foreground">
                            {slide.subtitle}
                            </p>
                        </div>
                        <div className="relative order-1 md:order-2 h-64 md:h-80">
                            <Image
                            src={slide.image}
                            alt={slide.title}
                            fill
                            className="object-cover"
                            data-ai-hint={slide.imageHint}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent"></div>
                        </div>
                    </div>
                </Card>
           </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 hidden sm:flex" />
      <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:flex" />
    </Carousel>
  );
}
