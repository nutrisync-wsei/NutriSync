import Image from 'next/image';
import styled from 'styled-components';

import DietHeaderArrow from '@/assets/images/DietHeaderArrow.png';
import DietHeaderBackground from '@/assets/images/DietHeaderBackground.png';
import Text from '@/ui/components/Text';

const DietScreenHeader = () => {
  return (
    <Container>
      <BackgroundImage
        src={DietHeaderBackground}
        alt="diet header background"
      />
      <Title>
        Find recipes for <br />
        the whole day
        <br /> based on your
        <br /> body metrics
        <ArrowImage src={DietHeaderArrow} alt="diet header arrow" />
        <IconContainer />
      </Title>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  height: 260px;
`;

const Title = styled(Text.H3)`
  position: absolute;
  top: 50px;
  right: 100px;
  left: 30px;
  color: ${({ theme }) => theme.palette.dark};
`;

const BackgroundImage = styled(Image)`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
`;

const ArrowImage = styled(Image)`
  position: absolute;
  width: 84px;
  height: 45px;
  bottom: -25px;
  right: -20px;
`;

const IconContainer = styled.div`
  position: absolute;
  top: 20px;
  right: -90px;
  width: 75px;
  height: 90px;
  background-color: ${({ theme }) => theme.palette.secondary};
  border-radius: 10px;
`;

export default DietScreenHeader;
