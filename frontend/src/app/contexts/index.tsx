"use client";
import { BreakpointProvider } from "@/app/contexts/BreakpointContext";
import { ThemeProvider } from "@/app/contexts/ThemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export function Provider({ children }: { children: React.ReactNode }) {
    return (
        <BreakpointProvider>
            <ThemeProvider>
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            </ThemeProvider >
        </BreakpointProvider >
    );
}