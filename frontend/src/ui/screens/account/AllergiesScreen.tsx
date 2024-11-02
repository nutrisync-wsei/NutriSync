'use client';
import styled from 'styled-components';

import Allergies from '@/ui/components/allergies';
import Text from '@/ui/components/Text';

const AllergiesScreen = () => {
  return (
    <Container>
      <TitleContainer>
        <Title>Select Dietary Restrictions</Title>
      </TitleContainer>
      <Content>
        <Allergies />
      </Content>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 0 0 50px;
  min-height: 100svh;
  background-color: ${({ theme }) => theme.palette.light};
  color: ${({ theme }) => theme.palette.dark};
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 60px 0 40px;
`;

const Title = styled(Text.H3)`
  max-width: 200px;
  text-align: center;
  color: ${({ theme }) => theme.palette.dark};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 20px;
  flex: 1;
`;

export default AllergiesScreen;
