import styled from 'styled-components';

import Text from './Text';

type HelperProps = {
  label?: string;
  type?: 'info' | 'error';
};

const Helper = ({ label = '', type = 'info' }: HelperProps) => {
  return <Label type={type}>{label}</Label>;
};

const Label = styled(Text.Small)<{
  type?: HelperProps['type'];
}>`
  width: 100%;
  height: 30px;
  line-height: 19.6px;
  color: ${({ theme, type }) =>
    type === 'error' ? theme.palette.error : theme.palette.subtleText};
  padding: 5px 0;
`;

export default Helper;
