
'use client';
import { EnrolledCourses } from '@/components/dashboard/enrolled-courses';
import { Recommendations } from '@/components/dashboard/recommendations';
import { useUser, useFirestore } from '@/firebase';
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
import { Skeleton } from '@/components/ui/skeleton';

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

  const enrolledCourses = mockCourses.slice(0, 2); 

  useEffect(() => {
    // If auth is still loading, do nothing.
    if (user === undefined) {
        setLoading(true);
        return;
    }
    // If user is not logged in, redirect.
    if (user === null) {
      router.push('/login');
      return;
    }
    
    // If we have a user and firestore, fetch the profile.
    if (user && firestore) {
      const userDocRef = doc(firestore, 'users', user.uid);
      getDoc(userDocRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            setUserProfile(docSnap.data() as UserProfile);
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
    } else {
        // Handle case where firestore might not be ready (though unlikely with provider)
        setLoading(false);
    }
  }, [user, firestore, router]);
  
  if (enrolledCourses.length === 0) {
    const name = userProfile?.name.split(' ')[0] || user?.displayName?.split(' ')[0] || 'Learner';
    return <Welcome name={name} />;
  }

  const getFirstName = () => {
      if (userProfile) {
          return userProfile.name.split(' ')[0];
      }
      if (user?.displayName) {
          return user.displayName.split(' ')[0];
      }
      return 'Learner';
  }

  const getAvatarFallback = () => {
      if (userProfile) {
          return (userProfile.name || "U").substring(0, 2).toUpperCase();
      }
      if (user?.displayName) {
          return (user.displayName || "U").substring(0, 2).toUpperCase();
      }
      return "L";
  }

  return (
    <div className="space-y-8">
        {loading ? (
            <div className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className='space-y-2'>
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-4 w-40" />
                </div>
            </div>
        ) : (
            <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                    <AvatarFallback>{getAvatarFallback()}</AvatarFallback>
                </Avatar>
                <div>
                    <h1 className="text-2xl font-bold">
                        Welcome back, {getFirstName()}!
                    </h1>
                    <Link href="/profile" className="text-sm text-primary hover:underline">
                        Add occupation and interests
                    </Link>
                </div>
            </div>
        )}
      
      <DashboardHero />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <EnrolledCourses />
          <AIGeneratedQuiz />
        </div>
        <div className="lg:col-span-1 space-y-8">
          <Recommendations />
          <AIQnA />
        </div>
      </div>
    </div>
  );
}
