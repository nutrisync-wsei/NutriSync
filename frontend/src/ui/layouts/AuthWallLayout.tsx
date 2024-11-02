'use client';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

import { useAuth } from '@/contexts/AuthContext';

type AuthWallProps = {
  children: ReactNode;
};

const AuthWallLayout = ({ children }: AuthWallProps) => {
  const { authUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authUser) {
      router.push('/login');
    }
  }, [authUser, router]);

  return children;
};

export default AuthWallLayout;
