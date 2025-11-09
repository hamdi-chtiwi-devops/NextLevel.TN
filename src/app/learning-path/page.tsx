
import { mockLearningPaths } from '@/lib/data';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Youtube, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LearningPathPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Learning Paths</h1>
        <p className="text-muted-foreground">
          Follow curated paths with YouTube playlists to master new skills.
        </p>
      </div>

      <div className="space-y-12">
        {mockLearningPaths.map((path) => (
          <Card key={path.id} className="overflow-hidden">
            <CardHeader>
              <Badge variant="secondary" className="w-fit mb-2">
                {path.category}
              </Badge>
              <CardTitle className="text-2xl">{path.title}</CardTitle>
              <CardDescription>{path.description}</CardDescription>
            </CardHeader>
            <div className="p-6 pt-0">
              <div className="relative space-y-8">
                {/* Vertical Connector Line */}
                <div className="absolute left-6 top-2 h-full w-0.5 bg-border -translate-x-1/2"></div>
                
                {path.playlists.map((playlist, index) => (
                  <div key={playlist.id} className="relative flex items-start gap-6">
                     <div className="flex-shrink-0 text-primary font-bold text-xl h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center z-10 border-4 border-background">
                        {index + 1}
                    </div>
                    <div className="flex-1 pt-2">
                      <p className="font-semibold text-lg">{playlist.title}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center gap-1.5">
                          <Youtube className="w-4 h-4" />
                          {playlist.author}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4" />
                          {playlist.duration}
                        </span>
                      </div>
                       <Button asChild variant="secondary" size="sm" className="mt-3">
                         <Link href={playlist.url} target="_blank" rel="noopener noreferrer">
                           Watch on YouTube
                         </Link>
                       </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
