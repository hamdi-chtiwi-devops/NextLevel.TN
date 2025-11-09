import Image from 'next/image';
import Link from 'next/link';
import { mockProjects } from '@/lib/data';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wrench } from 'lucide-react';

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Hands-On Projects</h1>
        <p className="text-muted-foreground">Apply your skills with these step-by-step project guides.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockProjects.map((project) => (
          <Link href={`/projects/${project.id}`} key={project.id} className="block group">
            <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <CardHeader className="p-0">
                <div className="relative h-48 w-full">
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    fill
                    className="object-cover"
                    data-ai-hint={project.category}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <Badge className="absolute top-3 right-3">{project.difficulty}</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-4 flex-1">
                <Badge variant="secondary" className="mb-2">{project.category}</Badge>
                <CardTitle className="text-lg font-bold leading-tight h-14 group-hover:text-primary transition-colors">
                    {project.title}
                </CardTitle>
                <CardDescription className="mt-2 text-sm line-clamp-2">{project.description}</CardDescription>
              </CardContent>
              <div className="p-4 border-t flex flex-wrap gap-2 bg-muted/30">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="outline" className="text-xs">{tech}</Badge>
                ))}
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}