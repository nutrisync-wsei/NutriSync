import Text from './Text'
import styled from 'styled-components'

type FormLabelProps = {
    label: string
}

// TODO: change to label for={} when implementing form
const FormLabel = ({ label }: FormLabelProps) => {
    return (
        <Label>{label}</Label>
    )
}

const Label = styled(Text.Body)`
    line-height: 22.4px;
    color: ${({ theme }) => theme.palette.onyx};
    width: 100%;
    padding: 10px 0;
`;

export default FormLabel