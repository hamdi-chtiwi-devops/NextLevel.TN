import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { type Lesson } from '@/lib/types';
import { PlayCircle, Clock, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export function CourseLessons({ lessons }: { lessons: Lesson[] }) {
  return (
    <Card className="max-w-4xl mx-auto">
        <CardHeader>
            <CardTitle>Course Content</CardTitle>
        </CardHeader>
        <CardContent>
            <Accordion type="single" collapsible className="w-full">
            {lessons.map((lesson, index) => (
                <AccordionItem value={`item-${index}`} key={lesson.id}>
                <AccordionTrigger>
                    <div className="flex items-center gap-4 text-left">
                        <PlayCircle className="w-6 h-6 text-primary shrink-0" />
                        <div className="flex-1">
                            <p className="font-semibold">{lesson.title}</p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                                <Clock className="w-3 h-3" />
                                <span>{lesson.duration} min</span>
                            </div>
                        </div>
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <div className="prose prose-sm dark:prose-invert max-w-none pl-10 pr-4">
                        <p>{lesson.content}</p>
                        <a href="#" className="text-primary font-semibold hover:underline">Watch Video Lesson</a>
                    </div>
                </AccordionContent>
                </AccordionItem>
            ))}
            </Accordion>
        </CardContent>
    </Card>
  );
}
