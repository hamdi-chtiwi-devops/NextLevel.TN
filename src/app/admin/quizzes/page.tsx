import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileQuestion } from "lucide-react";

export default function QuizzesManagementPage() {
  return (
    <div className="space-y-6">
        <div>
            <h1 className="text-3xl font-bold font-headline">Quiz Management</h1>
            <p className="text-muted-foreground">
                Oversee and manage all quizzes across the platform.
            </p>
        </div>
        <Card className="flex flex-col items-center justify-center text-center p-12">
            <CardHeader>
                <div className="mx-auto bg-muted p-4 rounded-full">
                    <FileQuestion className="w-12 h-12 text-muted-foreground" />
                </div>
                <CardTitle className="mt-4">Quiz Management Coming Soon</CardTitle>
                <CardDescription>
                    This section is under construction. Soon you'll be able to create, edit, and review all quizzes here.
                </CardDescription>
            </CardHeader>
        </Card>
    </div>
  );
}
