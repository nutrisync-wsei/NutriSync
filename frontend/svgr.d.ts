import { FC, SVGProps } from 'react';

interface CustomSVGProps extends SVGProps<SVGElement> {
  size?: number;
}

declare module '*.svg' {
  const content: FC<CustomSVGProps>;
  export default content;
}

declare module '*.svg?url' {
  const content: string;
  export default content;
}
