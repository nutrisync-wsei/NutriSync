"use client";
import styled, { css, keyframes } from "styled-components";
import WaveTopImage from "@/assets/images/WaveTop.png";
import WaveBottomImage from "@/assets/images/WaveBottom.png";
import Image from "next/image";
import Text from "@/ui/components/Text";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const OnboardingCompletedScreen = () => {
  const router = useRouter();

  useEffect(() => {
    //TODO: Base on request loading state in the future
    let timeout = setTimeout(() => {
      router.push("/home");
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <Container>
      <TextContainer>
        <Title>Thank you!</Title>
        <Subtitle>Hold on, we’re preparing the best plan for you.</Subtitle>
      </TextContainer>
      <WaveTopGreen src={WaveTopImage} alt="Wave top green" />
      <WaveTopLime src={WaveBottomImage} alt="Wave top lime" />
      <WaveBottomGreen src={WaveTopImage} alt="Wave bottom green" />
      <WaveBottomLime src={WaveBottomImage} alt="Wave bottom lime" />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100svh;
`;

const FadeIn = keyframes`
    0% { opacity: 0 }
    100% { opacity: 1 }
`;

const TextContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  width: 100%;
  padding: 0 40px;
  text-align: center;
  animation: ${FadeIn} 1s ease-in-out;
`;

const Title = styled(Text.H2)`
  color: ${({ theme }) => theme.palette.dark};
`;

const Subtitle = styled(Text.Subtitle)`
  color: ${({ theme }) => theme.palette.text};
`;

const WaveAnimationRotate0 = keyframes`
    0%, 100% { transform: scaleY(1) rotate(0); }
    50% { transform: scaleY(1.3) rotate(0); }
`;

const WaveAnimationRotate180 = keyframes`
    0%, 100% { transform: scaleY(1) rotate(180deg); }
    50% { transform: scaleY(1.3) rotate(180deg); }
`;

const waveAnimation0 = css`
  animation: ${WaveAnimationRotate0} 3s 1s ease-in-out infinite;
`;

const waveAnimation180 = css`
  animation: ${WaveAnimationRotate180} 3s 1s ease-in-out infinite;
`;

const WaveTopGreen = styled(Image)`
  position: fixed;
  width: 100%;
  height: 20%;

  top: 0;
  left: 0;
  transition: 0.5s;
  ${waveAnimation0};
`;

const WaveTopLime = styled(WaveTopGreen)`
  transform: rotate(180deg);
  top: -6%;
  ${waveAnimation180};
`;

const WaveBottomGreen = styled(WaveTopGreen)`
  transform: rotate(180deg);
  height: 25%;
  top: auto;
  bottom: 0;
  ${waveAnimation180};
`;

const WaveBottomLime = styled(WaveTopLime)`
  transform: rotate(0deg);
  height: 25%;
  top: auto;
  bottom: -6%;
  ${waveAnimation0};
`;

export default OnboardingCompletedScreen;
