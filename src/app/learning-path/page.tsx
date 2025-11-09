
import { mockLearningPaths } from '@/lib/data';
import { Roadmap } from '@/components/learning-path/roadmap';

export default function LearningPathPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Learning Paths</h1>
        <p className="text-muted-foreground">
          Follow curated paths with our courses to master new skills.
        </p>
      </div>

      <div className="space-y-16">
        {mockLearningPaths.map((path) => (
          <Roadmap
            key={path.id}
            title={path.title}
            description={path.description}
            category={path.category}
            steps={path.steps}
          />
        ))}
      </div>
    </div>
  );
}
