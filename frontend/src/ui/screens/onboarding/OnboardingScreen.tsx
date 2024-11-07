'use client';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

import Text from '@/components/Text';
import Button from '@/ui/components/controls/Button';

import Header from './components/Header';

const OnboardingScreen = () => {
  const router = useRouter();

  return (
    <Container>
      <Header />
      <Content>
        <Title>Hi, Kevin!</Title>
        <MainText>
          We want to provide you the best experience and prepare accurate
          guidelines. Please help us do so and fill in the short survey.
        </MainText>
        <ButtonsContainer>
          <Button
            onClick={() => {
              router.push('/onboarding/steps');
            }}
          >
            Let's go!
          </Button>
          <Button
            $variant="tertiary"
            onClick={() => {
              router.push('/home');
            }}
          >
            Nah, I want to skip
          </Button>
        </ButtonsContainer>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100svh;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  gap: 40px;
  padding: 20px;
`;

const Title = styled(Text.H2)`
  color: ${({ theme }) => theme.palette.dark};
`;

const MainText = styled(Text.Body)`
  color: ${({ theme }) => theme.palette.dark};
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  flex: 1;
  width: 100%;
  gap: 16px;
  padding-bottom: 8vh;
`;

export default OnboardingScreen;
