'use client';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import { useLogin } from '@/api/auth/hooks';
import { LoginFormValues } from '@/types/auth';
import Button from '@/ui/components/controls/Button';
import FormField from '@/ui/components/FormField';
import { VALIDATION } from '@/utils/validation';

const LoginScreen = () => {
  const { mutate } = useLogin();
  const router = useRouter();

  const { control, handleSubmit } = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onLogin = ({ email, password }: LoginFormValues) => {
    mutate(
      { email, password },
      {
        onSuccess: () => router.push('/onboarding'),
      },
    );
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
      />
      <Button variant="primary" onClick={handleSubmit(onLogin)}>
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
