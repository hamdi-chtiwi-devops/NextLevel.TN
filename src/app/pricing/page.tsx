
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Check, Star, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const plans = {
    monthly: {
        price: 29,
        priceId: 'price_monthly',
    },
    annual: {
        price: 290,
        priceId: 'price_annual',
    },
};

const features = [
    'Access to all premium courses',
    'Unlimited AI-powered quizzes',
    'Hands-on projects and source code',
    'Personalized learning paths',
    'AI Coding Arena access',
    'Downloadable certificates',
    'Priority support'
];


export default function PricingPage() {
    const [isAnnual, setIsAnnual] = useState(false);

  return (
    <div className="max-w-6xl mx-auto space-y-12 p-4">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
          Choose Your Plan
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Unlock your full potential with NextLevel Pro. Cancel anytime.
        </p>
        <div className="flex items-center justify-center space-x-4 pt-4">
          <Label htmlFor="billing-cycle" className={cn("font-medium", !isAnnual && "text-primary")}>
            Monthly
          </Label>
          <Switch
            id="billing-cycle"
            checked={isAnnual}
            onCheckedChange={setIsAnnual}
            aria-label="Toggle billing cycle"
          />
          <Label htmlFor="billing-cycle" className={cn("font-medium", isAnnual && "text-primary")}>
            Annually
          </Label>
           <div className="relative">
                <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2.5 py-1 rounded-full">SAVE 15%</span>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Pro Plan Card */}
        <Card className="border-2 border-primary shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 rounded-bl-lg text-sm font-bold">
                Most Popular
            </div>
          <CardHeader className="p-8">
            <Zap className="w-10 h-10 text-primary mb-4" />
            <CardTitle className="text-3xl font-bold">NextLevel Pro</CardTitle>
            <CardDescription>
              Everything you need to accelerate your learning and career.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 pt-0">
             <div className="mb-6">
                <span className="text-5xl font-bold">${isAnnual ? plans.annual.price / 12 : plans.monthly.price}</span>
                <span className="text-muted-foreground">/month</span>
                {isAnnual && (
                    <p className="text-sm text-muted-foreground mt-1">${plans.annual.price} billed annually</p>
                )}
            </div>
            <ul className="space-y-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="p-8 pt-0">
            <Button size="lg" className="w-full text-lg">
                Get Started with Pro
            </Button>
          </CardFooter>
        </Card>

         {/* Image Card */}
         <div className="relative h-full min-h-[400px] hidden md:flex">
             <Image 
                src="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?q=80&w=1974&auto=format&fit=crop" 
                alt="Happy developer"
                fill
                className="rounded-xl object-cover"
                data-ai-hint="person paying online"
            />
             <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl"></div>
             <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold">Join thousands of successful learners</h3>
                <p>Start your journey today.</p>
             </div>
         </div>
      </div>
    </div>
  );
}
