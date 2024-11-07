import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

export type Breakpoint =
  | 'wideDesktop'
  | 'desktop'
  | 'smallDesktop'
  | 'tablet'
  | 'mobile';

type BreakpointContextType = {
  currentBreakpoint: Breakpoint;
  isBreakpointActive: (breakpoint: Breakpoint) => boolean;
};

const BreakpointContext = createContext<BreakpointContextType | null>(null);

export const breakpointValues: Record<Exclude<Breakpoint, 'mobile'>, number> = {
  wideDesktop: 1441,
  desktop: 1221,
  smallDesktop: 1025,
  tablet: 801,
};

const widthToBreakpoint = (width: number): Breakpoint => {
  if (width < breakpointValues.tablet) {
    return 'mobile';
  }
  if (width < breakpointValues.smallDesktop) {
    return 'tablet';
  }
  if (width < breakpointValues.desktop) {
    return 'smallDesktop';
  }
  if (width < breakpointValues.wideDesktop) {
    return 'desktop';
  }
  return 'wideDesktop';
};

export const BreakpointProvider = ({ children }: { children: ReactNode }) => {
  const [windowSize, setWindowSize] = useState<number>(0);
  const [currentBreakpoint, setCurrentBreakpoint] = useState<Breakpoint>(
    widthToBreakpoint(windowSize),
  );

  useEffect(() => {
    setWindowSize(window.innerWidth);
    setCurrentBreakpoint(widthToBreakpoint(window.innerWidth));

    const handleResize = () => {
      setWindowSize(window.innerWidth);
      setCurrentBreakpoint(widthToBreakpoint(window.innerWidth));
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const value = useMemo(
    () => ({
      currentBreakpoint,
      isBreakpointActive: (breakpoint: Breakpoint): boolean => {
        if (breakpoint === 'mobile') {
          return currentBreakpoint === 'mobile';
        }

        const breakpointMinWidth =
          breakpointValues[breakpoint as keyof typeof breakpointValues];
        const currentBreakpointMinWidth =
          breakpointValues[currentBreakpoint as keyof typeof breakpointValues];

        if (currentBreakpoint === 'mobile') {
          return false;
        }

        return breakpointMinWidth <= currentBreakpointMinWidth;
      },
    }),
    [currentBreakpoint],
  );

  return (
    <BreakpointContext.Provider value={value}>
      {children}
    </BreakpointContext.Provider>
  );
};

export const useBreakpoint = () => {
  const context = useContext(BreakpointContext);
  if (!context) {
    throw new Error('useBreakpoint must be used within an BreakpointProvider');
  }
  return context;
};
