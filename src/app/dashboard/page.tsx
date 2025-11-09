
'use client';
import { EnrolledCourses } from '@/components/dashboard/enrolled-courses';
import { ProgressOverview } from '@/components/dashboard/progress-overview';
import { Recommendations } from '@/components/dashboard/recommendations';
import { useUser, useFirestore } from '@/firebase';
import { Badge } from '@/components/ui/badge';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { AIGeneratedQuiz } from '@/components/dashboard/ai-generated-quiz';
import { AIQnA } from '@/components/dashboard/ai-qna';
import { useRouter } from 'next/navigation';
import { Welcome } from '@/components/dashboard/welcome';
import { mockCourses } from '@/lib/data';
import { DashboardHero } from '@/components/dashboard/dashboard-hero';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Link from 'next/link';

type UserProfile = {
  name: string;
  email: string;
  role: 'Student';
};

export default function DashboardPage() {
  const user = useUser();
  const firestore = useFirestore();
  const router = useRouter();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // For this example, we'll assume the first two mock courses are enrolled.
  // In a real app, this would come from a user's data.
  const enrolledCourses = mockCourses.slice(0, 2); 

  useEffect(() => {
    if (user === undefined) {
      return;
    }
    if (user === null) {
      router.push('/login');
      return;
    }
    
    if (user && firestore) {
      const userDocRef = doc(firestore, 'users', user.uid);
      getDoc(userDocRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            const profile = docSnap.data() as UserProfile;
            setUserProfile(profile);
          } else {
             // New user, create a temporary profile from auth details
            setUserProfile({
                name: user.displayName || 'Learner',
                email: user.email || '',
                role: 'Student'
            });
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [user, firestore, router]);

  if (loading || user === undefined) {
    return <div>Loading...</div>;
  }
  
  if (!userProfile) {
    // This can happen briefly during redirects or if the user doc is missing.
    return <div>Loading user profile...</div>
  }

  const firstName = userProfile?.name.split(' ')[0] || 'Learner';
  const nameFallback = (userProfile?.name || "U").substring(0, 2).toUpperCase();
  
  if (enrolledCourses.length === 0) {
    return <Welcome name={firstName} />;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Avatar className="h-12 w-12">
            <AvatarFallback>{nameFallback}</AvatarFallback>
        </Avatar>
        <div>
            <h1 className="text-2xl font-bold">
                Welcome back, {firstName}!
            </h1>
            <Link href="/profile" className="text-sm text-primary hover:underline">
                Add occupation and interests
            </Link>
        </div>
      </div>
      
      <DashboardHero />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <EnrolledCourses />
          <AIGeneratedQuiz />
        </div>
        <div className="lg:col-span-1 space-y-8">
          <ProgressOverview />
          <Recommendations />
          <AIQnA />
        </div>
      </div>
    </div>
  );
}
