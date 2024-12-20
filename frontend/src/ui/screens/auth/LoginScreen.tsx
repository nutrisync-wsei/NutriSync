'use client';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import styled from 'styled-components';

import { useLogin } from '@/api/auth/hooks';
import { useUserProfile } from '@/api/user/hooks';
import { LoginFormValues } from '@/types/auth';
import Button from '@/ui/components/controls/Button';
import FormField from '@/ui/components/FormField';
import { VALIDATION } from '@/utils/validation';

const LoginScreen = () => {
  const { mutate } = useLogin();
  const router = useRouter();
  const { data: userProfile } = useUserProfile();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onLogin = ({ email, password }: LoginFormValues) => {
    mutate(
      { email, password },
      {
        onSuccess: (data) => {
          localStorage.setItem('accessToken', data.accessToken);
          localStorage.setItem('refreshToken', data.refreshToken);
          localStorage.setItem('user', JSON.stringify(data.user));
          window.dispatchEvent(new Event('storage'));

          toast('You are successfully logged!');

          if (!userProfile) router.push('/onboarding');
          else router.push('/home');
        },
        onError: () => {
          toast.error('Check your credentials!');
        },
      },
    );
  };

  const handleEnterPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !isSubmitting) {
      handleSubmit(onLogin)();
    }
  };

  return (
    <Container>
      <FormField
        label="E-mail"
        placeholder="john.citizen@example.com"
        fieldVariant="email"
        name="email"
        control={control}
        rules={{
          required: 'Email is required',
          pattern: {
            value: VALIDATION.REGEXP.EMAIL,
            message: 'Invalid email format',
          },
        }}
      />
      <FormField
        label="Password"
        placeholder="password"
        fieldVariant="password"
        name="password"
        control={control}
        rules={{
          required: 'Password is required',
          pattern: {
            value: VALIDATION.REGEXP.PASSWORD,
            message: 'Invalid password format',
          },
        }}
        onKeyDown={handleEnterPress}
      />
      <Button $variant="primary" onClick={handleSubmit(onLogin)}>
        Sign in
      </Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 25px 20px;
`;

export default LoginScreen;
