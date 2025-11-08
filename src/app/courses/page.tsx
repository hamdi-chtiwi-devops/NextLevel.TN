import Image from 'next/image';
import Link from 'next/link';
import { mockCourses } from '@/lib/data';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Users } from 'lucide-react';

export default function CoursesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Explore Courses</h1>
        <p className="text-muted-foreground">Find your next learning adventure from our curated selection.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {mockCourses.map((course) => (
          <Card key={course.id} className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <CardHeader className="p-0">
              <Link href={`/courses/${course.id}`} className="block">
                <Image
                  src={course.thumbnail}
                  alt={course.title}
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover"
                  data-ai-hint="course thumbnail"
                />
              </Link>
            </CardHeader>
            <CardContent className="p-4 flex-1">
              <Badge variant="secondary" className="mb-2">{course.category}</Badge>
              <CardTitle className="text-lg font-bold leading-tight h-14">
                <Link href={`/courses/${course.id}`} className="hover:text-primary transition-colors">
                  {course.title}
                </Link>
              </CardTitle>
              <CardDescription className="mt-2 text-sm">by {course.instructor}</CardDescription>
            </CardContent>
            <CardFooter className="p-4 border-t flex justify-between items-center bg-muted/30">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                <span>{course.rating}</span>
                <span className="text-muted-foreground">|</span>
                <Users className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">{course.enrolledStudents.toLocaleString()}</span>
              </div>
              {course.price ? (
                <span className="font-bold text-primary">${course.price}</span>
              ) : (
                <Badge>Free</Badge>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
