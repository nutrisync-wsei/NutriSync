import styled from 'styled-components';

import Text from '@/components/Text';

interface FormLabelProps {
  label: string;
  htmlFor: string;
}

const FormLabel = ({ label, htmlFor }: FormLabelProps) => {
  return (
    <Label htmlFor={htmlFor}>
      <LabelText>{label}</LabelText>
    </Label>
  );
};

const Label = styled.label`
  width: 100%;
  margin-left: 2px;
  margin-bottom: 4px;
`;

const LabelText = styled(Text.SmallMonaco)`
  color: ${({ theme }) => theme.palette.subtleText};
`;

export default FormLabel;
