import { ButtonHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'link' | 'disabled';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  $variant?: ButtonVariant;
}

const Button = ({ children, $variant = 'primary', ...rest }: ButtonProps) => {
  return (
    <StyledButton $variant={$variant} {...rest}>
      {children}
    </StyledButton>
  );
};

// TODO: Fonts don't work
const StyledButton = styled.button<ButtonProps>`
  font-family: 'RubikBold', sans-serif;
  font-weight: 700;
  padding: 12px 24px;
  font-size: 16px;
  letter-spacing: 4%;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  outline: none;
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;

  ${(props) => {
    switch (props.$variant) {
      case 'primary':
        return css`
          color: #ffffff;
          background-color: ${({ theme }) => theme.palette.primaryDark};
          box-shadow:
            0px 6px 2px -4px #0e0e2c1a,
            0px -1px 0px 0px #0e0e2c66 inset;

          &:hover {
            background-color: #046b4a;
          }

          &:active {
            background-color: #025930;
            transform: translateY(2px);
          }
        `;
      case 'secondary':
        return css`
          color: #0e0e0e;
          background-color: #a3df22;
          box-shadow: 0px -1px 0.5px 0px #0e0e2c66 inset;

          &:hover {
            background-color: #b7ef34;
          }

          &:active {
            background-color: #92c515;
            transform: trantextY(2px);
          }
        `;
      case 'tertiary':
        return css`
          color: #8c8ca1;
          background-color: #fffbfc;
          border: 1px solid #8c8ca1;

          &:hover {
            border-color: #aba7b9;
          }

          &:active {
            background-color: #ede7eb;
            transform: trantextY(2px);
          }
        `;
      case 'link':
        return css`
          color: ${({ theme }) => theme.palette.primaryDark};
          background-color: #ffffff;

          &:hover {
            text-decoration: underline;
          }

          &:active {
            color: #025930;
          }
        `;
      case 'disabled':
        return css`
          color: #8c8ca1;
          background-color: #ffffff;
          cursor: not-allowed;

          &:hover {
            cursor: not-allowed;
          }
        `;
      default:
        return null;
    }
  }}

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

export default Button;
