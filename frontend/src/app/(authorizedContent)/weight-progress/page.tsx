/* eslint-disable no-nested-ternary */
'use client';

import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import { useUpdateUserProgress, useUserProgress } from '@/api/user/hooks';
import Button from '@/ui/components/controls/Button';
import UserFeedback from '@/ui/components/feedback/UserFeedback';
import FormField from '@/ui/components/FormField';
import Text from '@/ui/components/Text';
import WeightChart from '@/ui/screens/account/WeightChart';

type WeightFormValues = {
  weight: number | null;
};

const WeightProgress = () => {
  const { mutate: updateUserProfile } = useUpdateUserProgress();
  const { data: userProgress } = useUserProgress();

  const { control, handleSubmit } = useForm<WeightFormValues>({
    defaultValues: {
      weight: null,
    },
  });

  const onSubmit = ({ weight }: WeightFormValues) => {
    if (!weight) return;

    updateUserProfile({ weight: +weight });
  };

  return (
    <Container>
      <Heading>Weight Progress</Heading>
      <StyledForm>
        <FormField
          label="Enter your current weight:"
          placeholder="90"
          name="weight"
          fieldVariant="number"
          control={control}
          rules={{
            required: 'Weight is required',
            validate: (value: number | null) => {
              if (value === null) return 'Weight is required';

              if (value <= 0) return 'Weight must be a positive number';
              if (value >= 500) return 'Weight must be less than 500';

              return true;
            },
          }}
        />
        <Button onClick={handleSubmit(onSubmit)}>Update</Button>
      </StyledForm>
      <UserFeedback />
      {userProgress?.length > 1 && <WeightChart data={userProgress} />}
    </Container>
  );
};

const Container = styled.div`
  margin: 0 auto;
  padding: 20px;
  box-shadow: 0 2px 4px #ccc;
  gap: 20px;
`;

const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Heading = styled(Text.H3)`
  margin-bottom: 20px;
`;

export default WeightProgress;
