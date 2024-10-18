import styled from 'styled-components';

import { API_URL } from '@/api/config';
import Icon from '@/assets/Icon';

const OtherAuthMethods = () => {
  return (
    <Container>
      <IconContainer href={`${API_URL}/auth/spotify`}>
        <SpotifyIcon />
      </IconContainer>
      <IconContainer href={`${API_URL}/auth/github`}>
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
