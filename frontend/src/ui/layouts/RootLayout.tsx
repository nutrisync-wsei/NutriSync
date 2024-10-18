import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

import { ContextProvider } from '@/contexts';

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <ContextProvider>{children}</ContextProvider>
        <Toaster
          position="top-right"
          reverseOrder={false}
          gutter={24}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            duration: 2000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
      </body>
    </html>
  );
}
