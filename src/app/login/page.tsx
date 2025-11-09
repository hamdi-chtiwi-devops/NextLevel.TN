
'use client';

import Link from 'next/link';
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
import { Logo } from '@/components/logo';
import { Mail, Lock } from 'lucide-react';
import { useAuth, useUser, useFirestore } from '@/firebase';
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  User,
} from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { doc, getDoc } from 'firebase/firestore';

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width="24px"
      height="24px"
    >
      <path
        fill="#FFC107"
        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
      />
      <path
        fill="#FF3D00"
        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
      />
      <path
        fill="#4CAF50"
        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
      />
      <path
        fill="#1976D2"
        d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C42.022,35.37,44,30.038,44,24C44,22.659,43.862,21.35,43.611,20.083z"
      />
    </svg>
  );
}

export default function LoginPage() {
  const auth = useAuth();
  const user = useUser();
  const firestore = useFirestore();
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isClient, setIsClient] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);


  useEffect(() => {
    setIsClient(true);
  }, []);

  const redirectUser = async (currentUser: User) => {
    if (!firestore || isRedirecting) return;
    setIsRedirecting(true);

    const userDocRef = doc(firestore, 'users', currentUser.uid);
    try {
      const docSnap = await getDoc(userDocRef);
      if (docSnap.exists() && docSnap.data().role === 'Admin') {
        router.push('/admin/dashboard');
      } else {
        router.push('/dashboard');
      }
    } catch {
      router.push('/dashboard');
    }
  };

  useEffect(() => {
    if (isClient && user) {
        redirectUser(user);
    }
  }, [user, isClient, firestore, router, isRedirecting]);
  

  const handleError = (error: any) => {
    let title = 'Sign in failed.';
    let description = error.message;

    if (error.code === 'auth/configuration-not-found') {
        title = 'Configuration Error';
        description = 'Google Sign-In is not enabled. Please enable it in your Firebase project settings.'
    } else if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
        title = 'Invalid Credentials';
        description = 'The email or password you entered is incorrect. Please try again.';
    } else if (error.code === 'auth/unauthorized-domain') {
        title = 'Unauthorized Domain';
        description = 'This domain is not authorized for authentication. Please add it in your Firebase project settings.'
    }


    toast({
        variant: 'destructive',
        title: title,
        description: description,
    });
  }

  const handleSignIn = async (signInFunction: () => Promise<User | null>) => {
    if (!auth || !firestore) return;
    try {
      const signedInUser = await signInFunction();
      if (signedInUser) {
        await redirectUser(signedInUser);
      }
    } catch (error: any) {
      handleError(error);
      setIsRedirecting(false); // Reset redirecting state on error
    }
  };

  const handleGoogleSignIn = async () => {
    await handleSignIn(async () => {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth!, provider);
      return result.user;
    });
  };

  const handleEmailSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleSignIn(async () => {
      const result = await signInWithEmailAndPassword(auth!, email, password);
      return result.user;
    });
  };
  
  if (!isClient || user === undefined || isRedirecting || user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-4 sm:p-6 md:p-8">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
      </div>
      <Card className="w-full max-w-md shadow-2xl border-2 border-border/50">
        <CardHeader className="text-center space-y-4 pt-8">
          <div className="flex justify-center items-center gap-2">
            <Logo />
            <span className="text-2xl font-bold font-headline">NextLevel.TN</span>
          </div>
          <CardTitle className="text-3xl font-headline">Welcome Back</CardTitle>
          <CardDescription>Sign in to access your learning dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleEmailSignIn}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="student@email.com"
                  required
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="ml-auto inline-block text-sm text-primary hover:underline" prefetch={false}>
                  Forgot your password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <Button className="w-full" type="submit">
              Sign in
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-4 pb-8">
          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>
          <Button variant="outline" className="w-full" onClick={handleGoogleSignIn}>
            <GoogleIcon className="mr-2" />
            Sign in with Google
          </Button>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="underline text-primary" prefetch={false}>
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
