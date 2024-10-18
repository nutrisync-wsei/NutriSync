'use client';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

import { useAuth } from '@/contexts/AuthContext';

type ReverseAuthWallLayoutProps = {
  children: ReactNode;
};

const ReverseAuthWallLayout = ({ children }: ReverseAuthWallLayoutProps) => {
  const auth = useAuth();
  const router = useRouter();

  if (auth) {
    router.push('/home');
  }

  return children;
};

export default ReverseAuthWallLayout;
