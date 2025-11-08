import { EnrolledCourses } from "@/components/dashboard/enrolled-courses";
import { ProgressOverview } from "@/components/dashboard/progress-overview";
import { Recommendations } from "@/components/dashboard/recommendations";
import { mockUser } from "@/lib/data";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
            <h1 className="text-3xl font-bold font-headline">Welcome back, {mockUser.name.split(' ')[0]}!</h1>
            <p className="text-muted-foreground">Here's your learning dashboard for today.</p>
        </div>
        <div className="flex items-center gap-2">
            <Badge variant="outline">Student</Badge>
            <Badge>NextLevel Pro</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            <EnrolledCourses />
        </div>
        <div className="lg:col-span-1 space-y-8">
            <ProgressOverview />
            <Recommendations />
        </div>
      </div>
    </div>
  );
}
