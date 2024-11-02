import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styled from 'styled-components';

import Button from '../controls/Button';
import Checkbox from '../controls/Checkbox';
import { allergiesList } from './constants';
import { Allergy } from './types';

const mockData = ['fish-free', 'celery-free', 'dairy-free'];

const Allergies = () => {
  const router = useRouter();
  console.log('allergiesList:', allergiesList);

  const [selectedOptions, setSelectedOptions] = useState<Allergy[]>(mockData);

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
              />
            </CheckContainer>
          ))}
        </OptionList>
      </OptionsListContainer>
      <ButtonsContainer>
        <Button
          onClick={() => console.log('selectedOptions:', selectedOptions)}
        >
          Save
        </Button>
        <Button variant="tertiary" onClick={() => router.back()}>
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
