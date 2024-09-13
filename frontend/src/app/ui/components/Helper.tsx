import Text from './Text'
import styled from 'styled-components'

type HelperProps = {
    label: string
}

const Helper = ({ label }: HelperProps) => {
    return (
        <Label>{label}</Label>
    )
}

const Label = styled(Text.Small)`
    line-height: 19.6px;
    color: ${({ theme }) => theme.palette.lightSlate};
    width: 100%;
    padding: 10px 0;
`;

export default Helper;