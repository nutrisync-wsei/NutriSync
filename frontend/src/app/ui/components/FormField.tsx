import FormLabel from './FormLabel'
import TextField from './controls/TextField'
import Helper from './Helper'
import styled from 'styled-components'

type FormFieldProps = {
    label: string
    placeholder: string
    helper: string
    fieldVariant?: 'text' | 'password' | 'email'
    name: string
}

const FormField = ({ label, placeholder, helper, name }: FormFieldProps) => {
    return (
        <StyledWrapper>
            <FormLabel htmlFor={name} label={label} />
            <TextField id={name} name={name} placeholder={placeholder} />
            <Helper label={helper} />
        </StyledWrapper>
    )
}

const StyledWrapper = styled.div<{ width?: string; height?: string }>`
    width: ${({ width }) => width || '320px'};
    display: flex;
    align-items: center;
    flex-direction: column;
 `;

export default FormField