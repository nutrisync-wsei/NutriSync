'use client';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import styled from 'styled-components';

import { useSignup } from '@/api/auth/hooks';
import { SignupFormValues } from '@/types/auth';
import Button from '@/ui/components/controls/Button';
import FormField from '@/ui/components/FormField';
import { VALIDATION } from '@/utils/validation';

type SignupForm = SignupFormValues & {
  'confirm-password': string;
};

const SignupScreen = () => {
  const { mutate } = useSignup();

  const router = useRouter();

  const {
    control,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignupForm>({
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
  });

  const onSignup = ({ email, password, name }: SignupFormValues) => {
    mutate(
      { email, password, name },
      {
        onSuccess: () => {
          toast('You are successfully signed up!');
          router.push('/login');
        },
        onError: () => {
          toast('Could not sign up. Please try again.');
        },
      },
    );
  };

  const handleEnterPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !isSubmitting) {
      handleSubmit(onSignup)();
    }
  };

  return (
    <Container>
      <FormField
        label="Name"
        placeholder="John Citizen"
        name="name"
        control={control}
        rules={{
          required: 'Name is required',
        }}
      />
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
        placeholder="Password"
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
      <FormField
        label="Confirm password"
        placeholder="Confirm password"
        fieldVariant="password"
        control={control}
        name="confirm-password"
        rules={{
          validate: (val: string) => {
            if (watch('password') != val) {
              return 'Your passwords do no match';
            }
          },
        }}
        onKeyDown={handleEnterPress}
      />
      <Button $variant="primary" onClick={handleSubmit(onSignup)}>
        Sign up
      </Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 25px 20px;
`;

export default SignupScreen;
