import { ReactNode } from 'react';

import AuthWallLayout from '@/ui/layouts/AuthWallLayout';
import NavigationLayout from '@/ui/layouts/NavigationLayout';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <AuthWallLayout>
      <NavigationLayout>{children}</NavigationLayout>
    </AuthWallLayout>
  );
}
