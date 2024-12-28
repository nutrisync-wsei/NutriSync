'use client';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

import { useUserProfile } from '@/api/user/hooks';
import { OnboardingStepsProvider } from '@/contexts/OnboardingStepsContext';

type OnboardingStepsLayoutProps = {
  children: ReactNode;
};

const OnboardingStepsLayout = ({ children }: OnboardingStepsLayoutProps) => {
  const { data, isFetched } = useUserProfile();
  const router = useRouter();

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (data && isFetched) {
      timeout = setTimeout(() => {
        router.push('/home');
      }, 1000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [data, isFetched, router]);

  return <OnboardingStepsProvider>{children}</OnboardingStepsProvider>;
};

export default OnboardingStepsLayout;
