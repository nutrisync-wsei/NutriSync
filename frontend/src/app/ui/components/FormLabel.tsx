import styled from 'styled-components';

interface FormLabelProps {
    label: string;
    htmlFor: string;
}

const FormLabel = ({ label, htmlFor }: FormLabelProps) => {
    return (
        <Label htmlFor={htmlFor}>{label}</Label>
    );
};

const Label = styled.label`
    width: 100%;
    line-height: 22.4px;
    color: ${({ theme }) => theme.palette.onyx};
    padding: 10px 0;
`;

export default FormLabel;