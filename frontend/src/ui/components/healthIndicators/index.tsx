import React from 'react';
import styled from 'styled-components';

import { useHealthIndicators } from '@/api/user/hooks';
import Text from '@/ui/components/Text';

const HealthIndicators = () => {
  const { data } = useHealthIndicators();

  return (
    <TileContainer>
      <TileTitle>Health Metrics</TileTitle>
      {data &&
        Object.entries(data).map(([key, value]) => (
          <Metric key={key}>
            <MetricLabel>{key}:</MetricLabel>
            <MetricValue>{value.toFixed(2)}</MetricValue>
          </Metric>
        ))}
    </TileContainer>
  );
};

const TileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 320px;
  padding: 30px 20px 20px 20px;
  margin: 20px auto;
  background-color: ${({ theme }) => theme.palette.accent};
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const TileTitle = styled(Text.H3)`
  color: ${({ theme }) => theme.palette.dark};
  margin-bottom: 20px;
  font-size: 24px;
  padding-bottom: 10px;
  width: 100%;
  text-align: center;
`;

const Metric = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 15px 0;
  border-bottom: 1px solid ${({ theme }) => theme.palette.text};
  &:last-child {
    border-bottom: none;
  }
`;

const MetricLabel = styled(Text.Body)`
  font-weight: bold;
  color: ${({ theme }) => theme.palette.text};
`;

const MetricValue = styled(Text.Body)`
  color: ${({ theme }) => theme.palette.primaryDark};
`;

export default HealthIndicators;
