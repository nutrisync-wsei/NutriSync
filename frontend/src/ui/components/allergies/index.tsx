import { useEffect, useState } from 'react';
import styled from 'styled-components';

import Checkbox from '@/ui/components/controls/Checkbox';

import { allergiesList } from './constants';
import { Allergy } from './types';

type AllergiesProps = {
  initialValues: Allergy[];
  setData: (data: Allergy[]) => void;
};

const Allergies = ({ initialValues, setData }: AllergiesProps) => {
  const [selectedOptions, setSelectedOptions] =
    useState<Allergy[]>(initialValues);

  const handleCheckboxChange = (value: Allergy) => {
    setSelectedOptions((prevOptions) => {
      if (prevOptions.includes(value)) {
        return prevOptions.filter((item) => item !== value);
      } else {
        return [...prevOptions, value];
      }
    });
  };

  useEffect(() => {
    setData(selectedOptions);
  }, [selectedOptions, setData]);

  return (
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
  );
};

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

export default Allergies;
