import React from 'react';
import styled from 'styled-components';
import Icon from '@/app/assets/Icon';

type TextFieldProps = {
    width?: string;
    height?: string;
    isValid?: boolean;
    hasError?: boolean;
    disabled?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

const TextField = ({ width, height, isValid, hasError, disabled, ...rest }: TextFieldProps) => {
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
                {hasError && <Icon.Error color='#ED5140' />}
                {!hasError && isValid && <Icon.Success color='#A3C3B1' />}
                {disabled && <Icon.Disabled color='#8C8CA1' />}
            </IconWrapper>
        </StyledTextFieldContainer>
    );
}

const StyledTextFieldContainer = styled.div<{ width?: string; height?: string }>`
    position: relative;
    width: ${({ width }) => width || '320px'};
    height: ${({ height }) => height || '48px'};
    display: flex;
    align-items: center;
`;

const StyledInput = styled.input<TextFieldProps>`
    width: 100%;
    height: 100%;
    border-radius: 8px;
    font-size: 16px;
    padding: 16px;
    padding-right: 32px;  // Make space for icon
    transition: all 0.2s ease-in-out;
    color: ${({ theme }) => theme.palette.onyx};
    background-color: ${({ hasError }) =>
        hasError ? '#FFFBFC' : 'white'};
    border: ${({ hasError, isValid, theme }) =>
        isValid ? `1px solid #A3C3B1` :
            hasError ? `1px solid ${theme.palette.flamingo}` :
                `1px solid ${theme.palette.slate}`};
    &:focus {
        border: ${({ hasError, isValid, theme }) => hasError ? `1px solid ${theme.palette.flamingo}` : isValid ? `1px solid #A3C3B1` : '1px solid #D0FFC3'};
        box-shadow: ${({ hasError, isValid, theme }) => hasError ? `0px 0px 0px 4px #ED514033` : isValid ? `0px 0px 0px 4px #027A3933` : '0px 0px 0px 4px #F5C19E33'};
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
    right: 8px;
    height: 100%;
`;

export default TextField;