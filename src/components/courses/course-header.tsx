import Image from 'next/image';
import { type Course } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Star, Users } from 'lucide-react';
import { findImage } from '@/lib/placeholder-images';

export function CourseHeader({ course }: { course: Course }) {
  const instructorAvatar = findImage('avatar-3'); 

  return (
    <div className="grid md:grid-cols-3 gap-6 md:gap-8 items-start">
      <div className="md:col-span-1">
        <Image
          src={course.thumbnail}
          alt={course.title}
          width={600}
          height={400}
          className="rounded-lg shadow-lg w-full aspect-[3/2] object-cover"
          data-ai-hint="course thumbnail"
        />
      </div>
      <div className="md:col-span-2 space-y-4">
        <Badge variant="secondary">{course.category}</Badge>
        <h1 className="text-3xl md:text-4xl font-bold font-headline">{course.title}</h1>
        <p className="text-base md:text-lg text-muted-foreground">{course.description}</p>
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={instructorAvatar} />
            <AvatarFallback>{course.instructor.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">Created by</p>
            <p className="text-primary font-medium">{course.instructor}</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-500" />
            <span>{course.rating} rating</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>{course.enrolledStudents.toLocaleString()} students</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{course.duration}</span>
          </div>
        </div>
        <Button size="lg" className="w-full sm:w-auto">
          Enroll Now {course.price && `for $${course.price}`}
        </Button>
      </div>
    </div>
  );
}
