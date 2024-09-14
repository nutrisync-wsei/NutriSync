import { ButtonHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'link' | 'disabled';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: ButtonVariant;
}

const Button = ({ children, variant, ...rest }: ButtonProps) => {
  return (
    <StyledButton variant={variant} {...rest}>
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
  line-height: 19px;
  letter-spacing: 4%;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  outline: none;
  width: auto;

  ${(props) => {
    switch (props.variant) {
      case 'primary':
        return css`
          color: #FFFFFF;
          background-color: #027A39;
          box-shadow: 0px 6px 2px -4px #0E0E2C1A, 0px -1px 0px 0px #0E0E2C66 inset;

          &:hover {
            background-color: #046B4A;
          }

          &:active {
            background-color: #025930;
            transform: translateY(2px);
          }
        `;
      case 'secondary':
        return css`
          color: #0E0E0E;
          background-color: #A3DF22;
          box-shadow: 0px -1px 0.5px 0px #0E0E2C66 inset;

          &:hover {
            background-color: #B7EF34;
          }

          &:active {
            background-color: #92C515;
            transform: translateY(2px);
          }
        `;
      case 'tertiary':
        return css`
          color: #8C8CA1;
          background-color: #FFFBFC;
          border: 1px solid #8C8CA1;

          &:hover {
            border-color: #ABA7B9;
          }

          &:active {
            background-color: #EDE7EB;
            transform: translateY(2px);
          }
        `;
      case 'link':
        return css`
          color: #027A39;
          background-color: #FFFFFF;

          &:hover {
            text-decoration: underline;
          }

          &:active {
            color: #025930;
          }
        `;
      case 'disabled':
        return css`
          color: #8C8CA1;
          background-color: #FFFFFF;
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
    background-color: #CCCCCC;
    cursor: not-allowed;
  }
`;

export default Button;