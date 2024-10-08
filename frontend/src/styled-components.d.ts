/* eslint-disable @typescript-eslint/no-empty-object-type */
import {} from 'styled-components';

import { Theme } from './ui/theme';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
