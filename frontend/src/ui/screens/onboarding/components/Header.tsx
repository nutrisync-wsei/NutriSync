import styled from 'styled-components';

import LogoWithText from '@/ui/components/LogoWithText';

const Header = () => {
  return (
    <Container>
      <LimeCircle />
      <WhiteCircle />
      <LogoContainer>
        <LogoWithText width={170} />
      </LogoContainer>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100vw;
  height: 40vh;
  background-color: ${({ theme }) => theme.palette.primaryDark};
  padding: 0 20px;
`;

const LogoContainer = styled.div`
  position: absolute;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
`;

const WhiteCircle = styled.div`
  position: absolute;
  width: 120%;
  height: 80%;
  left: 50%;
  transform: translateX(-50%);
  top: -35%;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.palette.light};
`;

const LimeCircle = styled(WhiteCircle)`
  width: 120%;
  top: -8%;
  background-color: ${({ theme }) => theme.palette.secondary};
`;

export default Header;
