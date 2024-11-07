import { ReactNode } from 'react';

import AuthLayout from '@/ui/layouts/AuthLayout';

const Layout = ({ children }: { children: ReactNode }) => {
  return <AuthLayout>{children}</AuthLayout>;
};

export default Layout;
