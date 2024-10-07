import { useRouter } from 'next/navigation';
import styled from 'styled-components';

import Text from '@/ui/components/Text';

const DontHaveAccount = () => {
  const router = useRouter();

  return (
    <Container>
      <DontHaveAccountText>Don't have an account?</DontHaveAccountText>
      <SignupText onClick={() => router.push('/signup')}>Signup</SignupText>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;
  padding: 20px 0 30px;
`;

const DontHaveAccountText = styled(Text.Body)`
  color: ${({ theme }) => theme.palette.text};
`;

const SignupText = styled(Text.Body)`
  color: ${({ theme }) => theme.palette.primaryDark};
  font-weight: bold;
  transition: 0.2s;
  text-decoration: underline;

  &:hover {
    cursor: pointer;
  }
`;

export default DontHaveAccount;
