import Icon from "@/assets/Icon";
import styled from "styled-components";

const OtherAuthMethods = () => {
  return (
    <Container>
      <IconContainer>
        <FacebookIcon />
      </IconContainer>
      <IconContainer href="http://localhost:3001/auth/spotify">
        <SpotifyIcon />
      </IconContainer>
      <IconContainer href="http://localhost:3001/auth/github">
        <GithubIcon />
      </IconContainer>
    </Container>
  );
};

const Container = styled.div`
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

export default OtherAuthMethods;
