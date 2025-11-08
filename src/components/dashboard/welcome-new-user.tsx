import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Rocket, Sparkles } from 'lucide-react';

export function WelcomeNewUser({ name }: { name: string }) {
  return (
    <div className="flex items-center justify-center h-full">
      <Card className="text-center p-8 max-w-2xl w-full animate-in fade-in-50 zoom-in-95 duration-500">
        <CardHeader>
          <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4">
            <Rocket className="w-12 h-12 text-primary" />
          </div>
          <CardTitle className="text-4xl font-headline">
            Welcome to NextLevel.TN, {name}!
          </CardTitle>
          <CardDescription className="text-lg text-muted-foreground mt-2">
            Your learning adventure starts now. Let's find the perfect course for you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
            <Button asChild size="lg">
              <Link href="/courses">
                <Sparkles className="mr-2 h-5 w-5" />
                Explore Courses
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/profile">
                Complete Your Profile
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
