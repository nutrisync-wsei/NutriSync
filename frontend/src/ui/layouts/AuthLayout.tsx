"use client";
import styled from "styled-components";

import { usePathname } from "next/navigation";
import OtherAuthMethods from "@/ui/screens/auth/components/OtherAuthMethods";
import DontHaveAccount from "@/ui/screens/auth/components/DontHaveAccount";
import Divider from "@/ui/components/Divider";
import Header from "@/ui/screens/auth/components/Header";
import { AuthScreenType } from "@/ui/screens/auth/types";

type AuthLayoutProps = {
  children: React.ReactNode;
};

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

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const pathname = usePathname();

  const screenType = getScreenType(pathname);

  return (
    <>
      <Container>
        <Header screenType={screenType} />
        <Content>
          <ScreenContainer>{children}</ScreenContainer>
          <Divider text={"or"} />
          <OtherAuthMethods />
          {screenType !== "signup" && <DontHaveAccount />}
        </Content>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Content = styled.div`
  background-color: ${({ theme }) => theme.palette.light};
`;

const ScreenContainer = styled.div``;

export default AuthLayout;
