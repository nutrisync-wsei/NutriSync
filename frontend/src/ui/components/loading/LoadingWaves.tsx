import LogoImage from "@/assets/images/Logo.png";
import LogoTextImage from "@/assets/images/LogoText.png";
import WaveTopImage from "@/assets/images/WaveTop.png";
import WaveBottomImage from "@/assets/images/WaveBottom.png";
import styled from "styled-components";
import Image from "next/image";
import { useEffect, useState } from "react";

const LoadingWaves = () => {
  const [waveHeight, setWaveHeight] = useState("30vh");
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    setTimeout(() => {
      setWaveHeight("60vh");
    }, 500);

    setTimeout(() => {
      setOpacity(0);
    }, 700);
  }, []);

  return (
    <Container opacity={opacity}>
      <WaveTop src={WaveTopImage} alt="Wave top" height={waveHeight} />
      <LogoContainer>
        <Logo src={LogoImage} alt="Logo" />
        <LogoText src={LogoTextImage} alt="Logo text" />
      </LogoContainer>
      <WaveBottom src={WaveBottomImage} alt="Wave bottom" height={waveHeight} />
    </Container>
  );
};

const Container = styled.div<{
  opacity: number;
}>`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100vw;
  height: 100vh;
  opacity: ${({ opacity }) => opacity};
  transition: 0.5s;
  background-color: ${({ theme }) => theme.palette.light};
  pointer-events: none;
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Logo = styled(Image)`
  width: 90px;
  height: 84px;
`;

const LogoText = styled(Image)`
  width: 180px;
  height: 84px;
`;

const WaveTop = styled(Image)<{
  height: string;
}>`
  position: fixed;
  width: 100%;
  height: 40%;

  top: 0;
  left: 0;
  transition: 0.5s;
  height: ${({ height }) => height};
`;

const WaveBottom = styled(WaveTop)`
  top: auto;
  bottom: 0;
  left: 0;
`;

export default LoadingWaves;
