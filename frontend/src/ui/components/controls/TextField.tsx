import { InputHTMLAttributes } from 'react';
import styled, { DefaultTheme } from 'styled-components';

import Icon from '@/assets/Icon';

type TextFieldProps = {
  width?: string;
  height?: string;
  isValid?: boolean;
  hasError?: boolean;
  disabled?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

const TextField = ({
  width,
  height,
  isValid,
  hasError,
  disabled,
  ...rest
}: TextFieldProps) => {
  return (
    <StyledTextFieldContainer width={width} height={height}>
      <StyledInput
        type="text"
        isValid={isValid}
        hasError={hasError}
        disabled={disabled}
        {...rest}
      />
      <IconWrapper>
        {hasError && <Icon.Error color="#ED5140" />}
        {!hasError && isValid && <Icon.Success color="#A3C3B1" />}
        {disabled && <Icon.Disabled color="#8C8CA1" />}
      </IconWrapper>
    </StyledTextFieldContainer>
  );
};

const StyledTextFieldContainer = styled.div<{
  width?: string;
  height?: string;
}>`
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '48px'};
  display: flex;
  align-items: center;
  position: relative;
`;

const getBackgroundColor = (hasError: boolean, isValid: boolean) => {
  if (hasError) return '#FFFBFC';
  if (isValid) return 'white';
  return '#ECF1F4';
};

const getBorder = (
  hasError: boolean,
  isValid: boolean,
  theme: DefaultTheme,
) => {
  if (isValid) return '1px solid #A3C3B1';
  if (hasError) return `1px solid ${theme.palette.error}`;
  return 'none';
};

const getFocusBorder = (
  hasError: boolean,
  isValid: boolean,
  theme: DefaultTheme,
) => {
  if (hasError) return `1px solid ${theme.palette.error}`;
  if (isValid) return '1px solid #A3C3B1';
  return '1px solid #D0FFC3';
};

const getBoxShadow = (
  theme: DefaultTheme,
  hasError: boolean,
  isValid: boolean,
) => {
  if (hasError) return '0px 0px 0px 4px #ED514033';
  if (isValid) return `0px 0px 0px 4px ${theme.palette.primaryDark}33`;
  return 'none';
};

const StyledInput = styled.input<TextFieldProps>`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  font-size: 16px;
  padding: 16px;
  padding-right: 48px;
  transition:
    background-color 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;
  color: ${({ theme }) => theme.palette.dark};
  background-color: ${({ hasError, isValid }) =>
    getBackgroundColor(!!hasError, !!isValid)};
  border: ${({ hasError, isValid, theme }) =>
    getBorder(!!hasError, !!isValid, theme)};
  &:focus {
    border: ${({ hasError, isValid, theme }) =>
      getFocusBorder(!!hasError, !!isValid, theme)};
    box-shadow: ${({ theme, hasError, isValid }) =>
      getBoxShadow(theme, !!hasError, !!isValid)};
    outline: none;
  }

  &:disabled {
    cursor: not-allowed;
    border: 0;
    opacity: 0.5;
    background-color: '#FAFCFE';
    box-shadow: none;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  height: 100%;
  right: 12px;
  top: 0;
  pointer-events: none;
`;

export default TextField;
