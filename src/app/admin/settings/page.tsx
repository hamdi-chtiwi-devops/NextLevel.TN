'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/logo";
import { Upload } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
        <div>
            <h1 className="text-3xl font-bold font-headline">Platform Settings</h1>
            <p className="text-muted-foreground">Manage your platform's branding and general settings.</p>
        </div>
        <Card>
            <CardHeader>
                <CardTitle>Branding</CardTitle>
                <CardDescription>Customize your platform's name and logo.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="platform-name">Platform Name</Label>
                    <Input id="platform-name" defaultValue="NextLevel.TN" />
                </div>
                <div className="space-y-2">
                    <Label>Platform Logo</Label>
                    <div className="flex items-center gap-6">
                        <div className="p-4 border rounded-lg bg-card">
                            <Logo />
                        </div>
                        <Button variant="outline">
                            <Upload className="mr-2 h-4 w-4" />
                            Upload New Logo
                        </Button>
                    </div>
                     <p className="text-sm text-muted-foreground">SVG, PNG, or JPG. Recommended size: 128x128px.</p>
                </div>
            </CardContent>
            <CardFooter>
                <Button>Save Changes</Button>
            </CardFooter>
        </Card>
    </div>
  );
}
