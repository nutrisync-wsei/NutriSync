'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import styled from 'styled-components';

import Text from '@/ui/components/Text';

const LogoutPage = () => {
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');

    setTimeout(() => {
      router.push('/login');
    }, 1500);
  }, [router]);

  return (
    <LogoutContainer>
      <Message>Logging out...</Message>
    </LogoutContainer>
  );
};

const LogoutContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const Message = styled(Text.Body)`
  font-size: 20px;
  color: #333;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export default LogoutPage;
