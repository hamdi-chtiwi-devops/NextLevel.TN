
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { ArrowRight, BookOpen, Code, Rocket } from 'lucide-react';
import Image from 'next/image';

export function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Logo />
            <span className="text-xl font-bold font-headline">NextLevel.TN</span>
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32">
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] dark:bg-background">
                <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,hsl(var(--primary)/0.1),transparent)]"></div>
            </div>
          <div className="container text-center">
            <div className="bg-primary/10 text-primary inline-flex items-center gap-2 rounded-full px-4 py-1 text-sm font-semibold mb-4">
              <Rocket className="w-4 h-4" />
              <span>Launch your career to the next level.</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold font-headline tracking-tighter">
              The Modern Way to <br />
              Master <span className="text-primary">Tech Skills</span>.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              An intelligent, fully managed e-learning platform with AI-powered tools to accelerate your journey from learner to pro.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/signup">
                  Start Learning for Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/courses">Explore Courses</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 md:py-28 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">Why NextLevel.TN?</h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                We provide the tools and content you need to succeed in the ever-evolving world of technology.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-8 bg-card rounded-lg border">
                <div className="inline-block bg-primary/10 text-primary p-4 rounded-full mb-4">
                  <BookOpen className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold">Curated Learning Paths</h3>
                <p className="mt-2 text-muted-foreground">
                  Follow expert-designed roadmaps that guide you from foundational concepts to advanced skills in your chosen field.
                </p>
              </div>
              <div className="text-center p-8 bg-card rounded-lg border">
                <div className="inline-block bg-primary/10 text-primary p-4 rounded-full mb-4">
                  <Code className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold">Hands-On Projects</h3>
                <p className="mt-2 text-muted-foreground">
                  Apply what you learn with step-by-step projects that simulate real-world development challenges.
                </p>
              </div>
              <div className="text-center p-8 bg-card rounded-lg border">
                 <div className="inline-block bg-primary/10 text-primary p-4 rounded-full mb-4">
                  <Rocket className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold">AI-Powered Tools</h3>
                <p className="mt-2 text-muted-foreground">
                  Sharpen your skills with AI-generated quizzes, practice problems, and an intelligent Q&A assistant.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="py-8 border-t">
        <div className="container text-center text-muted-foreground">
          &copy; {new Date().getFullYear()} NextLevel.TN. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}
