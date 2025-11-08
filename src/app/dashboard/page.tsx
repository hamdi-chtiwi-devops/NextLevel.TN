
'use client';
import { EnrolledCourses } from '@/components/dashboard/enrolled-courses';
import { ProgressOverview } from '@/components/dashboard/progress-overview';
import { Recommendations } from '@/components/dashboard/recommendations';
import { useUser, useFirestore } from '@/firebase';
import { Badge } from '@/components/ui/badge';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { WelcomeNewUser } from '@/components/dashboard/welcome-new-user';
import { AIGeneratedQuiz } from '@/components/dashboard/ai-generated-quiz';
import { AIQnA } from '@/components/dashboard/ai-qna';
import { useRouter } from 'next/navigation';

type UserProfile = {
  name: string;
  email: string;
  role: 'Student' | 'Admin';
};

export default function DashboardPage() {
  const user = useUser();
  const firestore = useFirestore();
  const router = useRouter();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);

  useEffect(() => {
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
             if (profile.role === 'Admin') {
                router.push('/admin/dashboard');
                return;
            }
            setUserProfile(profile);
          } else {
            setUserProfile({
                name: user.displayName || 'Learner',
                email: user.email || '',
                role: 'Student'
            });
            setIsNewUser(true);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } else if (user === undefined) {
      // Auth state still loading
      setLoading(true);
    }
  }, [user, firestore, router]);

  if (loading || user === undefined) {
    return <div>Loading...</div>;
  }
  
  if (isNewUser) {
    return <WelcomeNewUser name={user?.displayName?.split(' ')[0] || 'learner'} />;
  }
  
  if (!userProfile) {
    return <div>Loading user profile...</div>
  }

  const firstName = userProfile?.name.split(' ')[0] || 'Learner';

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
          {userProfile && <Badge variant="outline">{userProfile.role}</Badge>}
          {userProfile?.role === 'Student' && <Badge>NextLevel Pro</Badge>}
        </div>
      </div>

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
