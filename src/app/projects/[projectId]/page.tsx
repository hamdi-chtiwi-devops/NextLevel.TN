import { notFound } from 'next/navigation';
import Image from 'next/image';
import { mockProjects } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export default async function ProjectDetailPage({ params }: { params: { projectId: string } }) {
  const project = mockProjects.find((p) => p.id === params.projectId);

  if (!project) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="relative h-72 rounded-lg overflow-hidden">
            <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                className="object-cover"
                data-ai-hint={project.category}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        </div>
        <div className="relative -mt-16 px-8 text-white">
            <Badge variant="secondary" className='mb-2'>{project.category}</Badge>
            <h1 className="text-4xl font-bold font-headline ">{project.title}</h1>
            <p className="text-lg text-white/90 mt-1">{project.description}</p>
        </div>
      </div>

      {/* Meta Info */}
      <Card>
        <CardContent className="p-4 flex flex-wrap gap-4 items-center justify-between">
            <div>
                <p className="text-sm font-semibold text-muted-foreground">Difficulty</p>
                <Badge>{project.difficulty}</Badge>
            </div>
            <div>
                <p className="text-sm font-semibold text-muted-foreground">Technologies</p>
                <div className="flex flex-wrap gap-2 mt-1">
                    {project.technologies.map((tech) => (
                        <Badge key={tech} variant="outline">{tech}</Badge>
                    ))}
                </div>
            </div>
        </CardContent>
      </Card>


      {/* Steps */}
      <Card>
        <CardHeader>
          <CardTitle>Project Steps</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {project.steps.map((step, index) => (
            <div key={index} className="flex gap-4">
                <div className="flex flex-col items-center">
                    <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg ring-4 ring-primary/20">
                        {index + 1}
                    </div>
                    {index < project.steps.length - 1 && (
                        <div className="w-0.5 flex-1 bg-border my-2" />
                    )}
                </div>
              <div className="flex-1 pb-6">
                <h3 className="font-bold text-lg">{step.title}</h3>
                <p className="text-muted-foreground mt-1 prose prose-sm dark:prose-invert max-w-none">{step.content}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}