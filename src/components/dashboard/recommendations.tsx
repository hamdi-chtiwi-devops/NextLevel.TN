'use client';

import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getPersonalizedCourseRecommendations } from '@/ai/flows/personalized-course-recommendations';
import { Skeleton } from '@/components/ui/skeleton';
import { Lightbulb, RefreshCw } from 'lucide-react';
import { Badge } from '../ui/badge';

export function Recommendations() {
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRecommendations = async () => {
    setLoading(true);
    try {
      const result = await getPersonalizedCourseRecommendations({
        studentId: 'user-123',
        learningHistory: 'Completed "Full-Stack Web Development with React & Firebase". Strong performance in JavaScript and React modules. Showed interest in UI/UX principles.',
        preferences: 'Prefers project-based learning, intermediate difficulty.',
      });
      setRecommendations(result.recommendedCourses);
    } catch (error) {
      console.error('Failed to fetch recommendations:', error);
      // Fallback recommendations
      setRecommendations([
          "Advanced UI/UX Design Principles",
          "Data Science & Machine Learning Bootcamp",
          "The Complete Digital Marketing Course"
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className='space-y-1.5'>
            <CardTitle className="flex items-center gap-2">
                <Lightbulb className="text-accent" />
                <span>For You</span>
            </CardTitle>
            <CardDescription>AI-powered course recommendations.</CardDescription>
        </div>
        <Button variant="ghost" size="icon" onClick={fetchRecommendations} disabled={loading}>
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex flex-col space-y-2">
                    <Skeleton className="h-5 w-4/5 rounded-lg" />
                    <Skeleton className="h-4 w-2/5 rounded-lg" />
                </div>
              ))
            : recommendations.map((rec, index) => (
                <div key={index} className="p-3 rounded-lg transition-colors hover:bg-muted/50">
                  <p className="font-semibold text-sm">{rec}</p>
                   <Badge variant="outline" className="mt-1">New Suggestion</Badge>
                </div>
              ))}
        </div>
      </CardContent>
    </Card>
  );
}
