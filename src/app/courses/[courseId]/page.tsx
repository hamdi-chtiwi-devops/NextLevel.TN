import { notFound } from 'next/navigation';
import { mockCourses } from '@/lib/data';
import { CourseHeader } from '@/components/courses/course-header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CourseLessons } from '@/components/courses/course-lessons';
import { CourseQuiz } from '@/components/courses/course-quiz';
import { CourseForum } from '@/components/courses/course-forum';
import { BookOpen, HelpCircle, MessageSquare } from 'lucide-react';

export default async function CourseDetailPage({ params }: { params: { courseId: string } }) {
  const course = mockCourses.find((c) => c.id === params.courseId);

  if (!course) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <CourseHeader course={course} />

      <Tabs defaultValue="lessons" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-lg mx-auto">
          <TabsTrigger value="lessons">
            <BookOpen className="w-4 h-4 mr-2" />
            Lessons
          </TabsTrigger>
          <TabsTrigger value="quiz">
            <HelpCircle className="w-4 h-4 mr-2" />
            Quiz
          </TabsTrigger>
          <TabsTrigger value="forum">
            <MessageSquare className="w-4 h-4 mr-2" />
            Forum
          </TabsTrigger>
        </TabsList>
        <TabsContent value="lessons" className="mt-6">
          <CourseLessons lessons={course.lessons} />
        </TabsContent>
        <TabsContent value="quiz" className="mt-6">
          <CourseQuiz courseId={course.id} />
        </TabsContent>
        <TabsContent value="forum" className="mt-6">
          <CourseForum />
        </TabsContent>
      </Tabs>
    </div>
  );
}
