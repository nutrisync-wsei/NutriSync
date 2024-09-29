"use client";
import Icon from "@/assets/Icon";
import styled from "styled-components";
import CircleLimeImage from "@/assets/images/CircleLime.png";
import CircleGreyImage from "@/assets/images/CircleGrey.png";
import LogoImage from "@/assets/images/Logo.png";
import LogoTextImage from "@/assets/images/LogoText.png";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Text from "@/ui/components/Text";
import { ReactNode, useEffect, useRef, useState } from "react";
import LoadingWaves from "@/ui/components/loading/LoadingWaves";

type AuthLayoutProps = {
  children: ReactNode;
};

type AuthScreenType = "login" | "signup" | "welcome";

const getScreenType = (pathname: string): AuthScreenType => {
  switch (pathname) {
    case "/login":
      return "login";
    case "/signup":
      return "signup";
    default:
      return "welcome";
  }
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

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const router = useRouter();
  const windowWidth = window.innerWidth;
  const pathname = usePathname();

  const screenType = getScreenType(pathname);

  const headerTitle = getHeaderTitle(screenType);

  const [headerHeight, setHeaderHeight] = useState(0);

  return (
    <>
      <Container>
        <Header
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
                  Some text here that you should sign in or sign up to be
                  healthy
                </Subtitle>
              )}
            </TextContainer>
          </HeaderContainer>
        </Header>
        <Content>
          <ScreenContainer>{children}</ScreenContainer>
          <DividerContainer>
            <DividerLine />
            <DividerText>or</DividerText>
            <DividerLine />
          </DividerContainer>
          <OtherAuthMethods>
            <IconContainer>
              <FacebookIcon />
            </IconContainer>
            <IconContainer href="http://localhost:3001/auth/spotify">
              <SpotifyIcon />
            </IconContainer>
            <IconContainer href="http://localhost:3001/auth/github">
              <GithubIcon />
            </IconContainer>
          </OtherAuthMethods>
          {screenType !== "signup" && (
            <DontHaveAccount>
              <DontHaveAccountText>Don't have an account?</DontHaveAccountText>
              <SignupText onClick={() => router.push("/signup")}>
                Signup
              </SignupText>
            </DontHaveAccount>
          )}
        </Content>
      </Container>

      {/* <LoadingWaves /> */}
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Header = styled.div`
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

const Content = styled.div`
  background-color: ${({ theme }) => theme.palette.light};
`;

const ScreenContainer = styled.div``;

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

const DividerContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 20px;
`;

const DividerLine = styled.div`
  height: 1px;
  flex: 1;
  background-color: ${({ theme }) => theme.palette.text};
`;

const DividerText = styled(Text.Body)`
  color: ${({ theme }) => theme.palette.text};
`;

const OtherAuthMethods = styled.div`
  display: flex;
  justify-content: center;
  gap: 50px;
  padding: 20px;
`;

const FacebookIcon = styled(Icon.Facebook).attrs(({ theme }) => ({
  color: theme.palette.text,
}))`
  transition: 0.2s;
`;

const SpotifyIcon = styled(Icon.Spotify).attrs(({ theme }) => ({
  color: theme.palette.text,
}))`
  transition: 0.2s;
`;

const GithubIcon = styled(Icon.Github).attrs(({ theme }) => ({
  color: theme.palette.text,
}))`
  transition: 0.2s;
`;

const IconContainer = styled.a`
  display: block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.palette.text};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s;

  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.palette.accent};
    ${FacebookIcon} {
      opacity: 0.9;
    }
  }
`;

const DontHaveAccount = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;
  padding: 20px 0 30px;
`;

const DontHaveAccountText = styled(Text.Body)`
  color: ${({ theme }) => theme.palette.text};
`;

const SignupText = styled(Text.Body)`
  color: ${({ theme }) => theme.palette.primaryDark};
  font-weight: bold;
  transition: 0.2s;
  text-decoration: underline;

  &:hover {
    cursor: pointer;
  }
`;

export default AuthLayout;
