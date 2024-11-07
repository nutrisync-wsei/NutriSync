import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useUpdateUserProfile, useUserProfile } from '@/api/user/hooks';
import Button from '@/ui/components/controls/Button';
import Checkbox from '@/ui/components/controls/Checkbox';

import { allergiesList } from './constants';
import { Allergy } from './types';

const Allergies = () => {
  const router = useRouter();
  const [selectedOptions, setSelectedOptions] = useState<Allergy[]>([]);
  const { mutate: updateUserProfile } = useUpdateUserProfile();
  const { data: userProfile, isLoading, isError } = useUserProfile();

  useEffect(() => {
    if (userProfile?.dietaryRestrictions) {
      setSelectedOptions(userProfile.dietaryRestrictions);
    } else {
      setSelectedOptions([]);
    }
  }, [userProfile]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading profile data</div>;
  }

  const handleCheckboxChange = (value: Allergy) => {
    setSelectedOptions((prevOptions) => {
      if (prevOptions.includes(value)) {
        return prevOptions.filter((item) => item !== value);
      } else {
        return [...prevOptions, value];
      }
    });
  };

  return (
    <Container>
      <OptionsListContainer>
        <OptionList>
          {allergiesList.map((option) => (
            <CheckContainer key={option.value}>
              <Checkbox
                label={option.label}
                initialState={selectedOptions.includes(option.value)}
                checkboxColorVariant="primary"
                onChange={() => handleCheckboxChange(option.value)}
              />
            </CheckContainer>
          ))}
        </OptionList>
      </OptionsListContainer>
      <ButtonsContainer>
        <Button
          onClick={() =>
            updateUserProfile({ dietaryRestrictions: selectedOptions })
          }
        >
          Save
        </Button>
        <Button $variant="tertiary" onClick={() => router.back()}>
          Back
        </Button>
      </ButtonsContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  flex: 1;
  padding: 20px 0;
  margin: auto;
  gap: 30px;
`;

const OptionsListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
`;

const OptionList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
  row-gap: 12px;
`;

const CheckContainer = styled.div`
  width: calc(50% - 5px);
  min-width: 120px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export default Allergies;
