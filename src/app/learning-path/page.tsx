import { mockLearningPaths } from '@/lib/data';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
            <CardContent>
              <div className="space-y-4">
                {path.playlists.map((playlist, index) => (
                  <div key={playlist.id} className="flex items-start gap-4 p-4 rounded-lg border bg-muted/20">
                     <div className="flex-shrink-0 text-primary font-bold text-xl h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
                        {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">{playlist.title}</p>
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
                    </div>
                    <Button asChild variant="outline" size="sm">
                      <Link href={playlist.url} target="_blank" rel="noopener noreferrer">
                        Watch on YouTube
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
