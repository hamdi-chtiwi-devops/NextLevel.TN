import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

export default function CommunityPage() {
  return (
    <div className="space-y-6">
        <div>
            <h1 className="text-3xl font-bold font-headline">Community</h1>
            <p className="text-muted-foreground">
            Connect with other learners and instructors.
            </p>
        </div>
        <Card className="flex flex-col items-center justify-center text-center p-12">
            <CardHeader>
                <div className="mx-auto bg-muted p-4 rounded-full">
                    <Users className="w-12 h-12 text-muted-foreground" />
                </div>
                <CardTitle className="mt-4">Community Hub Coming Soon</CardTitle>
                <CardDescription>
                    A place to connect, discuss, and learn together is under construction. Stay tuned!
                </CardDescription>
            </CardHeader>
        </Card>
    </div>
  );
}
