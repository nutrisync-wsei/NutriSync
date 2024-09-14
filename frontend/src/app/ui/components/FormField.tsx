import FormLabel from './FormLabel'
import TextField from './controls/TextField'
import Helper from './Helper'
import styled from 'styled-components'

type FormFieldProps = {
    label: string
    placeholder: string
    helper: string
    fieldVariant?: 'text' | 'password' | 'email'
}

// TODO: Add all accessibility attributes like name etc.
// TODO: Fix placement so that it doesn't render under other components
const FormField = ({ label, placeholder, helper }: FormFieldProps) => {
    return (
        <StyledWrapper>
            <FormLabel label={label} />
            <TextField placeholder={placeholder} />
            <Helper label={helper} />
        </StyledWrapper>
    )
}

const StyledWrapper = styled.div<{ width?: string; height?: string }>`
    width: ${({ width }) => width || '320px'};
    height: ${({ height }) => height || '48px'};
    display: flex;
    align-items: center;
    flex-direction: column;
`;

export default FormField