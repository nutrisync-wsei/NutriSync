'use client';
import { useRouter } from 'next/navigation';
import { ReactNode, useLayoutEffect, useState } from 'react';

import { useAuth } from '@/contexts/AuthContext';

type AuthWallProps = {
  children: ReactNode;
};

const AuthWallLayout = ({ children }: AuthWallProps) => {
  const { authUser } = useAuth();
  const router = useRouter();
  const [isAuthCheckComplete, setIsAuthCheckComplete] = useState(false);

  useLayoutEffect(() => {
    if (!authUser) return;

    if (authUser.authorized) {
      setIsAuthCheckComplete(true);
    } else {
      router.push('/login');
    }
  }, [authUser, router]);

  if (!isAuthCheckComplete || !authUser) {
    return null;
  }

  return <>{children}</>;
};

export default AuthWallLayout;
