'use client';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';

import { useAuth } from '@/contexts/AuthContext';

type ReverseAuthWallLayoutProps = {
  children: ReactNode;
};

const ReverseAuthWallLayout = ({ children }: ReverseAuthWallLayoutProps) => {
  const { authUser } = useAuth();
  const router = useRouter();
  const [isAuthCheckComplete, setIsAuthCheckComplete] = useState(false);

  useEffect(() => {
    setIsAuthCheckComplete(true);

    if (authUser) {
      router.push('/home');
    }
  }, [authUser, router]);

  if (!isAuthCheckComplete) {
    return <div>Loading...</div>;
  }

  return children;
};

export default ReverseAuthWallLayout;
