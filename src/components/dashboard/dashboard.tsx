'use client';
import { EnrolledCourses } from '@/components/dashboard/enrolled-courses';
import { ProgressOverview } from '@/components/dashboard/progress-overview';
import { Recommendations } from '@/components/dashboard/recommendations';
import { useUser } from '@/firebase';
import { Badge } from '@/components/ui/badge';
import { doc, getDoc } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { useEffect, useState } from 'react';

type UserProfile = {
  name: string;
  email: string;
  role: 'Student' | 'Admin';
};

export function Dashboard() {
  const user = useUser();
  const firestore = useFirestore();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (user && firestore) {
      const userDocRef = doc(firestore, 'users', user.uid);
      getDoc(userDocRef).then((docSnap) => {
        if (docSnap.exists()) {
          setUserProfile(docSnap.data() as UserProfile);
        }
      });
    }
  }, [user, firestore]);

  if (!user || !userProfile) {
    return <div>Loading...</div>;
  }

  const firstName = userProfile.name.split(' ')[0];

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline">
            Welcome back, {firstName}!
          </h1>
          <p className="text-muted-foreground">
            Here's your learning dashboard for today.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline">{userProfile.role}</Badge>
          {userProfile.role === 'Student' && <Badge>NextLevel Pro</Badge>}
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
