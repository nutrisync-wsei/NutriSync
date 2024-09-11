import { Breakpoint } from "../contexts/BreakpointContext";

export const palette = {
    darkSpring: '#317A52',
    yellowGreen: '#A3DF22',
    peach: '#F5C19E',
    onyx: '#0E0E0E',
    slate: '#4A4A68',
    lightSlate: '#8C8CA1',
    dorian: '#ECF1F4',
    snow: '#FFFBFC',
    flamingo: '#ED5140'
}

type BreakpointValues<T> = { [K in Exclude<Breakpoint, 'mobile'>]?: T } & {
  default: T;
};

const theme = {
  palette,
  select: <T>({}: { dark: T; light: T }): T => {
    throw new Error('This should never be called.');
  },
  breakpoint: <T>({}: BreakpointValues<T>): T => {
    throw new Error('This should never be called.');
  },
  media: {} as Record<Exclude<Breakpoint, 'mobile'>, (_: string) => string>,
};

export type Theme = typeof theme;
export default theme;