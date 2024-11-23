'use client';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode } from 'react';
import styled, { useTheme } from 'styled-components';

import { menuItems } from '@/constants';
import Text from '@/ui/components/Text';

const NavigationLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const theme = useTheme();
  const pathname = usePathname();

  return (
    <Container>
      <Content>{children}</Content>
      <BottomNav>
        {menuItems.map((item) => (
          <IconWrapper
            key={item.path}
            onClick={() => router.push(item.path)}
            $isActive={pathname === item.path}
          >
            <item.Icon
              color={
                pathname === item.path
                  ? theme.palette.primaryDark
                  : theme.palette.dark
              }
            />
            {pathname === item.path ? (
              <Text.MenuLinkActive>{item.label}</Text.MenuLinkActive>
            ) : (
              <Text.MenuLink>{item.label}</Text.MenuLink>
            )}
          </IconWrapper>
        ))}
      </BottomNav>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100svh;
  width: 100%;
  overflow: hidden;
`;

const Content = styled.div`
  flex: 1;
  width: 100%;
  overflow-y: auto;
  padding-bottom: 70px;
`;

const BottomNav = styled.div`
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 60px;
  padding: 8px;
  background-color: ${({ theme }) => theme.palette.accent};
  z-index: 1000;
`;

const IconWrapper = styled.div<{ $isActive: boolean }>`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.palette.primaryDark : theme.palette.dark};
`;

export default NavigationLayout;
