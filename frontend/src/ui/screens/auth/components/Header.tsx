import { useState } from "react";
import styled from "styled-components";
import Text from "@/ui/components/Text";
import CircleLimeImage from "@/assets/images/CircleLime.png";
import CircleGreyImage from "@/assets/images/CircleGrey.png";
import LogoImage from "@/assets/images/Logo.png";
import LogoTextImage from "@/assets/images/LogoText.png";
import Image from "next/image";
import { AuthScreenType } from "../types";

type HeaderProps = {
  screenType: AuthScreenType;
};

const getHeaderTitle = (screenType: AuthScreenType): string => {
  switch (screenType) {
    case "login":
      return "Sign in";
    case "signup":
      return "Sign up";
    default:
      return "Welcome";
  }
};

const Header = ({ screenType }: HeaderProps) => {
  const headerTitle = getHeaderTitle(screenType);

  const [headerHeight, setHeaderHeight] = useState(0);

  return (
    <Container
      ref={(el) => {
        if (el) {
          setHeaderHeight(el.clientHeight);
        }
      }}
    >
      <HeaderContainer height={headerHeight}>
        <CircleLime src={CircleLimeImage} alt="CircleLime" />
        <CircleGrey src={CircleGreyImage} alt="CircleGrey" />
        <LogoContainer>
          <Logo src={LogoImage} alt="Logo" />
          <LogoText src={LogoTextImage} alt="Logo" />
        </LogoContainer>
        <TextContainer>
          <Title>{headerTitle}</Title>
          {screenType === "welcome" && (
            <Subtitle>
              Some text here that you should sign in or sign up to be healthy
            </Subtitle>
          )}
        </TextContainer>
      </HeaderContainer>
    </Container>
  );
};

const Container = styled.div`
  background-color: ${({ theme }) => theme.palette.primaryDark};
  flex: 1;
`;

const HeaderContainer = styled.div<{
  height: number;
}>`
  position: fixed;
  background-color: ${({ theme }) => theme.palette.primaryDark};
  transition: 0.5s ease;
  top: 0;
  left: 0;
  width: 100%;
  height: ${({ height }) => height || 350}px;
`;

const CircleLime = styled(Image)`
  position: absolute;
  top: 0;
  right: 0;
  width: 100vw;
  height: 70%;
`;

const CircleGrey = styled(Image)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 45%;
`;

const LogoContainer = styled.div`
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Logo = styled(Image)`
  width: 52px;
  height: 49px;
`;

const LogoText = styled(Image)`
  width: 119px;
  height: 55px;
`;

const TextContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: flex-start;
  padding: 0 50px 30px 25px;
`;

const Title = styled(Text.H2)`
  color: ${({ theme }) => theme.palette.light};
`;

const Subtitle = styled(Text.Body)`
  color: ${({ theme }) => theme.palette.light};
`;

export default Header;
