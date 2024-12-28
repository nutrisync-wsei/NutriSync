/* eslint-disable no-nested-ternary */
'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import styled from 'styled-components';

import {
  useUpdateUserProgress,
  useUserProfile,
  useUserProgress,
} from '@/api/user/hooks';
import Button from '@/ui/components/controls/Button';
import Input from '@/ui/components/controls/TextField';
import UserFeedback from '@/ui/components/feedback/UserFeedback';
import Text from '@/ui/components/Text';
import WeightChart from '@/ui/screens/account/WeightChart';

const ProfileInfo = () => {
  const { data: user } = useUserProfile();
  const [weight, setWeight] = useState<number | ''>(user?.weight || '');
  const { mutate: updateUserProfile } = useUpdateUserProgress();
  const { data: userProgress } = useUserProgress();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (typeof weight === 'number') {
      updateUserProfile({ weight });
    }
  };

  const handleWeightChange = (event: ChangeEvent<HTMLInputElement>) => {
    setWeight(parseFloat(event.target.value) || '');
  };

  return (
    <Container>
      <Heading>Profile Info</Heading>
      <StyledForm onSubmit={handleSubmit}>
        <label>
          <InputLabel>Enter your current weight:</InputLabel>
          <Input
            type="number"
            value={weight.toString()}
            onChange={handleWeightChange}
            required
          />
        </label>
        <Button type="submit">Update</Button>
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

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Heading = styled(Text.H3)`
  margin-bottom: 20px;
`;

const InputLabel = styled(Text.Body)`
  margin-bottom: 5px;
`;

export default ProfileInfo;
