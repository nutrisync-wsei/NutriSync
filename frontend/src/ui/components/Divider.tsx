import styled from "styled-components";
import Text from "@/ui/components/Text";

type DividerProps = {
  text?: string;
};

const Divider = ({ text }: DividerProps) => {
  return (
    <DividerContainer>
      <DividerLine />
      {text && <DividerText>{text}</DividerText>}
      <DividerLine />
    </DividerContainer>
  );
};

const DividerContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0 20px;
`;

const DividerLine = styled.div`
  height: 1px;
  flex: 1;
  background-color: ${({ theme }) => theme.palette.text};
`;

const DividerText = styled(Text.Body)`
  margin: 0 10px;
  color: ${({ theme }) => theme.palette.text};
`;

export default Divider;
