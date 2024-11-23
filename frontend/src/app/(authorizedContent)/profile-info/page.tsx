/* eslint-disable no-nested-ternary */
'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import styled from 'styled-components';

import {
  useUpdateUserProgress,
  useUserProfile,
  useUserProgress,
} from '@/api/user/hooks';
import { UserProgress } from '@/api/user/types';
import UserFeedback from '@/ui/components/feedback/UserFeedback';

const ProfileInfo = () => {
  const { data: user } = useUserProfile();
  const [weight, setWeight] = useState<number | ''>(user?.weight || '');
  const { mutate: updateUserProfile } = useUpdateUserProgress();
  const { data: userProgress, isLoading } = useUserProgress();

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
      <form onSubmit={handleSubmit}>
        <label>
          Weight:
          <Input
            type="number"
            value={weight.toString()}
            onChange={handleWeightChange}
            required
          />
        </label>
        <Button type="submit">Update</Button>
      </form>

      <ProgressList>
        {isLoading ? (
          <p>Loading progress...</p>
        ) : userProgress && userProgress.length > 0 ? (
          userProgress.map((progress: UserProgress, index: number) => (
            <ProgressItem key={index}>
              <p>Date: {String(progress.timestamp) || 'N/A'}</p>
              <p>Weight: {progress.weight} kg</p>
            </ProgressItem>
          ))
        ) : (
          <p>No progress data available.</p>
        )}
      </ProgressList>

      <UserFeedback />
    </Container>
  );
};

const Container = styled.div`
  width: 300px;
  margin: 0 auto;
  padding: 20px;
  box-shadow: 0 2px 4px #ccc;
`;

const Input = styled.input`
  margin: 10px 0;
  width: 95%;
  padding: 8px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: blue;
  color: white;
  border: none;
  cursor: pointer;
`;

const ProgressList = styled.div`
  margin-top: 20px;
`;

const ProgressItem = styled.div`
  background: #f0f0f0;
  padding: 10px;
  margin-bottom: 10px;
`;

export default ProfileInfo;
