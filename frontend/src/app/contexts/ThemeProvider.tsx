import { ReactNode, useEffect, useState } from "react";
import { Breakpoint, useBreakpoint } from "@/app/contexts/BreakpointContext";
import theme, { Theme } from "@/app/ui/theme";
import { ThemeProvider as WebThemeProvider } from 'styled-components';

const sortedBreakpoints: Exclude<Breakpoint, 'mobile'>[] = [
    'wideDesktop',
    'desktop',
    'smallDesktop',
    'tablet',
];

const ThemeProvider = ({
    darkMode: defaultDarkMode,
    children,
}: {
    darkMode?: boolean;
    children: ReactNode;
}) => {
    const [darkMode, setDarkMode] = useState(defaultDarkMode);
    const { isBreakpointActive } = useBreakpoint();

    const matchDarkMediaQuery = () => {
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    };

    useEffect(() => {
        setDarkMode(matchDarkMediaQuery());

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = () => setDarkMode(mediaQuery.matches);

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    const globalTheme: Theme = {
        ...theme,
        palette: {
            ...theme.palette,
        },
        select: ({ dark, light }) => (darkMode ? dark : light),
        media: {
            tablet: (styles) => (isBreakpointActive('tablet') ? styles : ''),
            smallDesktop: (styles) =>
                isBreakpointActive('smallDesktop') ? styles : '',
            desktop: (styles) => (isBreakpointActive('desktop') ? styles : ''),
            wideDesktop: (styles) =>
                isBreakpointActive('wideDesktop') ? styles : '',
        },
        breakpoint: (breakpointStyles) => {
            const validBreakpoint = sortedBreakpoints.find(
                (breakpoint) =>
                    breakpoint in breakpointStyles && isBreakpointActive(breakpoint),
            );
            if (validBreakpoint) {
                const value = breakpointStyles[validBreakpoint];
                return value !== undefined ? value : breakpointStyles.default;
            }
            return breakpointStyles.default;
        },
    };

    return (
        <WebThemeProvider theme={globalTheme}>{children}</WebThemeProvider>
    );
};

export { ThemeProvider };