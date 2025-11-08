import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
        <div>
            <h1 className="text-3xl font-bold font-headline">Admin Dashboard</h1>
            <p className="text-muted-foreground">
                Manage your platform and users.
            </p>
        </div>
        <Card>
            <CardHeader>
                <CardTitle>Welcome, Admin!</CardTitle>
                <CardDescription>This is your control center.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                    <Shield className="w-8 h-8 text-primary" />
                    <p>You have successfully accessed the admin-only area. More features coming soon!</p>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
