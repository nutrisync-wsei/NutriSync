'use client';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

import { useAuth } from '@/contexts/AuthContext';

type ReverseAuthWallLayoutProps = {
  children: ReactNode;
};

const ReverseAuthWallLayout = ({ children }: ReverseAuthWallLayoutProps) => {
  const { authUser } = useAuth();
  const router = useRouter();

  if (authUser?.authorized) {
    router.push('/home');
  }

  return children;
};

export default ReverseAuthWallLayout;
