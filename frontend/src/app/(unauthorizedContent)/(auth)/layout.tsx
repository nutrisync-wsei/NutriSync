import { ReactNode } from 'react';

import AuthLayout from '@/ui/layouts/AuthLayout';
import ReverseAuthWallLayout from '@/ui/layouts/ReverseAuthWallLayout';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <ReverseAuthWallLayout>
      <AuthLayout>{children}</AuthLayout>
    </ReverseAuthWallLayout>
  );
};

export default Layout;
