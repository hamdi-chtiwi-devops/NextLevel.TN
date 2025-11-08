'use client';
import { EnrolledCourses } from '@/components/dashboard/enrolled-courses';
import { ProgressOverview } from '@/components/dashboard/progress-overview';
import { Recommendations } from '@/components/dashboard/recommendations';
import { useUser, useFirestore } from '@/firebase';
import { Badge } from '@/components/ui/badge';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { WelcomeNewUser } from './welcome-new-user';
import { AIGeneratedQuiz } from './ai-generated-quiz';
import { AIQnA } from './ai-qna';

type UserProfile = {
  name: string;
  email: string;
  role: 'Student' | 'Admin';
};

export function Dashboard() {
  const user = useUser();
  const firestore = useFirestore();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);

  useEffect(() => {
    if (user && firestore) {
      const userDocRef = doc(firestore, 'users', user.uid);
      getDoc(userDocRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            setUserProfile(docSnap.data() as UserProfile);
          } else {
            // This is likely a new user whose profile hasn't been created yet or doesn't exist.
            // We can create a temporary profile from the auth user object.
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
    } else if (!user) {
        // Handle case where user is not logged in or logs out
        setLoading(false);
    }
  }, [user, firestore]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    // This case should be handled by the layout, but as a fallback
    return <div>Please log in.</div>;
  }
  
  if (isNewUser) {
    return <WelcomeNewUser name={user.displayName?.split(' ')[0] || 'learner'} />;
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
