'use client';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

import { useAuth } from '@/contexts/AuthContext';

type AuthWallProps = {
  children: ReactNode;
};

const AuthWallLayout = ({ children }: AuthWallProps) => {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!auth) {
      router.push('/login');
    }
  }, [auth, router]);

  return children;
};

export default AuthWallLayout;
