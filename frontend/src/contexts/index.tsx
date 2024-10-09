'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

import { AuthProvider } from '@/contexts/AuthContext';
import { BreakpointProvider } from '@/contexts/BreakpointContext';
import { ThemeProvider } from '@/contexts/ThemeProvider';

const queryClient = new QueryClient();

type ContextProviderProps = {
  children: ReactNode;
};

export function ContextProvider({ children }: ContextProviderProps) {
  return (
    <BreakpointProvider>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>{children}</AuthProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </BreakpointProvider>
  );
}
