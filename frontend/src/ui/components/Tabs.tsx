import styled from 'styled-components';

import Text from '@/ui/components/Text';

type TabConfig = {
  id: string;
  title: string;
  component: React.ReactNode;
};

type TabsProps = {
  tabConfig: TabConfig[];
  activeTabId: string;
  setActiveTabId: (tab: string) => void;
};

const Tabs = ({ tabConfig, activeTabId, setActiveTabId }: TabsProps) => {
  const activeItem = tabConfig.find((tab) => tab.id === activeTabId);

  return (
    <Container>
      <HeaderContainer>
        {tabConfig.map((tab) => (
          <TabItem key={tab.id} onClick={() => setActiveTabId(tab.id)}>
            <TabItemText active={tab.id === activeTabId}>
              {tab.title}
            </TabItemText>
          </TabItem>
        ))}
      </HeaderContainer>
      <ContentContainer>{activeItem?.component}</ContentContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 24px;
`;

const HeaderContainer = styled.div`
  display: flex;
  gap: 20px;
  justify-content: space-around;
`;

const TabItem = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TabItemText = styled(Text.Body)<{
  active: boolean;
}>`
  text-align: center;
  position: relative;
  cursor: pointer;
  width: fit-content;
  color: ${({ theme }) => theme.palette.dark};

  ${({ theme, active }) =>
    active &&
    `
    font-weight: bold;
    &:after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 10%;
        display: block;
        width: 80%;
        height: 3px;
        border-radius: 5px;
        background-color: ${theme.palette.dark};
        }
  `}
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export default Tabs;
