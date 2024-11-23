import styled from 'styled-components';

import Text from '@/ui/components/Text';

type SmallCardProps = {
  title: string;
  subtitle: string;
};

const SmallCard = ({ title, subtitle }: SmallCardProps) => {
  return (
    <Container>
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  min-width: 77px;
  gap: 2px;
  padding: 10px 0 8px 0;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.palette.tertiary};
  box-shadow: 0px 4px 4px 0px #00000040 inset;
`;

const Title = styled(Text.BodyBold)`
  color: ${({ theme }) => theme.palette.dark};
`;

const Subtitle = styled(Text.Small)`
  color: ${({ theme }) => theme.palette.text};
`;

export default SmallCard;
