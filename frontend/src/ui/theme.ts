import { Breakpoint } from "../contexts/BreakpointContext";

export const palette = {
  primary: "#317A52",
  primaryDark: "#027A39",
  secondary: "#A3DF22",
  tertiary: "#F5C19E",
  dark: "#0E0E0E",
  text: "#4A4A68",
  subtleText: "#8C8CA1",
  accent: "#ECF1F4",
  light: "#FFFBFC",
  error: "#ED5140",
};

type BreakpointValues<T> = { [K in Exclude<Breakpoint, "mobile">]?: T } & {
  default: T;
};

const theme = {
  palette,
  select: <T>({}: { dark: T; light: T }): T => {
    throw new Error("This should never be called.");
  },
  breakpoint: <T>({}: BreakpointValues<T>): T => {
    throw new Error("This should never be called.");
  },
  media: {} as Record<Exclude<Breakpoint, "mobile">, (_: string) => string>,
};

export type Theme = typeof theme;
export default theme;
