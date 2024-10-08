"use client";
import { BreakpointProvider } from "@/contexts/BreakpointContext";
import { ThemeProvider } from "@/contexts/ThemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

const queryClient = new QueryClient();

type ContextProviderProps = {
  children: ReactNode;
};

export function ContextProvider({ children }: ContextProviderProps) {
  return (
    <BreakpointProvider>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </ThemeProvider>
    </BreakpointProvider>
  );
}
