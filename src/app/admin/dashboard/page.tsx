import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, BookOpen, HelpCircle, Settings, ArrowRight } from "lucide-react";
import Link from "next/link";

const adminFeatures = [
    {
        title: "User Management",
        description: "View and manage all platform users.",
        icon: Users,
        href: "/admin/users",
        cta: "Manage Users"
    },
    {
        title: "Course Management",
        description: "Add, edit, or remove courses.",
        icon: BookOpen,
        href: "/admin/courses",
        cta: "Manage Courses"
    },
    {
        title: "Quiz Management",
        description: "Oversee and manage all quizzes.",
        icon: HelpCircle,
        href: "/admin/quizzes",
        cta: "Manage Quizzes"
    },
    {
        title: "Platform Settings",
        description: "Update platform name, logo, and theme.",
        icon: Settings,
        href: "/admin/settings",
        cta: "Go to Settings"
    }
]

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
        <div>
            <h1 className="text-3xl font-bold font-headline">Admin Dashboard</h1>
            <p className="text-muted-foreground">
                Welcome, Admin! This is your control center.
            </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {adminFeatures.map((feature) => (
                <Card key={feature.title} className="flex flex-col">
                    <CardHeader className="flex flex-row items-start gap-4">
                        <div className="bg-muted p-3 rounded-lg">
                           <feature.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <CardTitle>{feature.title}</CardTitle>
                            <CardDescription>{feature.description}</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        {/* Content can be added here if needed */}
                    </CardContent>
                    <CardContent>
                         <Button asChild className="w-full">
                            <Link href={feature.href}>
                                {feature.cta}
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </div>
    </div>
  );
}
