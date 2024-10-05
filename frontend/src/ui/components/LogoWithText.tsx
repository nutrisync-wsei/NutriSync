import styled from "styled-components";
import LogoImage from "@/assets/images/Logo.png";
import LogoTextImage from "@/assets/images/LogoText.png";
import Image from "next/image";

type LogoWithText = {
  width?: number;
};

const LogoWithText = ({ width = 170 }: LogoWithText) => {
  return (
    <LogoContainer width={width}>
      <Logo src={LogoImage} alt="Logo" />
      <LogoText src={LogoTextImage} alt="Logo text" />
    </LogoContainer>
  );
};

const LogoContainer = styled.div<{
  width: number;
}>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => width}px;
  aspect-ratio: 170/55;
`;

const Logo = styled(Image)`
  width: 30%;
  height: auto;
  aspect-ratio: 52/49;
`;

const LogoText = styled(Image)`
  flex: 1;
  height: auto;
  aspect-ratio: 119/55;
`;

export default LogoWithText;
