'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useAuth, useFirestore, useUser } from '@/firebase';
import { useEffect, useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { updatePassword, updateProfile } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { Camera } from 'lucide-react';

export default function ProfilePage() {
  const user = useUser();
  const auth = useAuth();
  const firestore = useFirestore();
  const { toast } = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.displayName || '');
      setEmail(user.email || '');
    }
  }, [user]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleProfileUpdate = async () => {
    if (!user || !auth?.currentUser || !firestore) return;

    try {
      // Update display name in Firebase Auth
      await updateProfile(auth.currentUser, { displayName: name });

      // Update user profile in Firestore
      const userDocRef = doc(firestore, 'users', user.uid);
      await setDoc(userDocRef, { name }, { merge: true });

      toast({
        title: 'Profile updated',
        description: 'Your changes have been saved.',
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Update failed',
        description: error.message,
      });
    }
  };

  const handlePasswordChange = async () => {
    if (!auth?.currentUser) return;
    try {
      await updatePassword(auth.currentUser, newPassword);
      toast({
        title: 'Password changed',
        description: 'Your password has been updated. Please log in again.',
      });
      // Consider re-authenticating or signing out
      setCurrentPassword('');
      setNewPassword('');
    } catch (error: any) {
       toast({
        variant: 'destructive',
        title: 'Password change failed',
        description: error.message,
      });
    }
  };


  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold font-headline">My Profile</h1>
        <p className="text-muted-foreground">Manage your personal information and settings.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Update your photo and personal details here.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative">
              <Image
                src={user.photoURL || `https://avatar.vercel.sh/${user.uid}.png`}
                alt="User Avatar"
                width={96}
                height={96}
                className="rounded-full border-4 border-background"
                data-ai-hint="person face"
              />
              <Button size="icon" className="absolute bottom-0 right-0 rounded-full h-8 w-8">
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1 text-center sm:text-left">
              <p className="text-xl font-bold">{user.displayName}</p>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <Separator />
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} disabled />
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button onClick={handleProfileUpdate}>Save Changes</Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Password</CardTitle>
          <CardDescription>Change your password here. After saving, you might be logged out.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Current Password</Label>
            <Input id="current-password" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input id="new-password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          </div>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button onClick={handlePasswordChange}>Set New Password</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
