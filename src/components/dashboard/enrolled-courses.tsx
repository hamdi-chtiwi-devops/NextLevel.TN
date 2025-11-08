import Link from 'next/link';
import Image from 'next/image';
import { mockCourses } from '@/lib/data';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowRight } from 'lucide-react';

export function EnrolledCourses() {
  const enrolled = mockCourses.slice(0, 2); // Mock: user is enrolled in first 2 courses

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Courses</CardTitle>
        <CardDescription>Continue your learning journey where you left off.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {enrolled.map((course, index) => {
            const progress = (index + 1) * 35; // Mock progress
            return (
                <Link href={`/courses/${course.id}`} key={course.id} className="block group">
                    <div className="flex items-center gap-4 p-3 rounded-lg transition-colors hover:bg-muted/50">
                        <Image
                            src={course.thumbnail}
                            alt={course.title}
                            width={120}
                            height={80}
                            className="rounded-md object-cover"
                            data-ai-hint="course thumbnail"
                        />
                        <div className="flex-1">
                            <p className="font-semibold group-hover:text-primary">{course.title}</p>
                            <p className="text-sm text-muted-foreground">by {course.instructor}</p>
                            <div className="flex items-center gap-2 mt-2">
                                <Progress value={progress} className="h-2" />
                                <span className="text-xs font-medium text-muted-foreground">{progress}%</span>
                            </div>
                        </div>
                         <ArrowRight className="h-5 w-5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>
                </Link>
            )
        })}
      </CardContent>
      <CardFooter>
        <Button variant="outline" asChild>
            <Link href="/courses">
                Explore More Courses
            </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
