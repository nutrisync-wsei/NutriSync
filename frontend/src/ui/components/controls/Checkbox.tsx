import { useState } from 'react';
import styled from 'styled-components';

import Icon from '@/assets/Icon';
import Text from '@/ui/components/Text';
import theme from '@/ui/theme';

interface CheckboxProps {
  initialState?: boolean;
  label?: string;
  checkboxColorVariant?: 'primary' | 'tertiary';
  checkboxSizeVariant?: 'small' | 'large';
  onChange?: (checked: boolean) => void;
}

const getCheckedColor = (variant: CheckboxProps['checkboxColorVariant']) => {
  switch (variant) {
    case 'primary':
      return theme.palette.primaryDark;
    case 'tertiary':
    default:
      return theme.palette.tertiary;
  }
};

const Checkbox = ({
  initialState = false,
  label,
  checkboxColorVariant,
  checkboxSizeVariant = 'large',
  onChange,
}: CheckboxProps) => {
  const [checked, setChecked] = useState(initialState);

  const toggleCheckbox = () => {
    setChecked(!checked);
    if (onChange) {
      onChange(!checked);
    }
  };

  return (
    <Container $withLabel={Boolean(label)} onClick={toggleCheckbox}>
      <CheckboxContainer
        checked={checked}
        checkboxSizeVariant={checkboxSizeVariant}
        checkboxColorVariant={checkboxColorVariant}
      >
        <StyledCheckbox
          type="checkbox"
          checked={checked}
          onChange={toggleCheckbox}
        />
        <SuccessIconStyled checked={checked} color="#FFFFFF" />
      </CheckboxContainer>
      {label && <CheckboxLabel>{label}</CheckboxLabel>}
    </Container>
  );
};

export default Checkbox;

const Container = styled.div<{
  $withLabel?: boolean;
}>`
  ${({ $withLabel }) =>
    $withLabel &&
    `
    display: flex;
    align-items: center;
    padding: 0 10px;
    min-height: 45px;
    gap: 10px;
    border-radius: 5px;
    background-color: #f8f8f8;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: background-color 0.3s ease;

  `}
`;

const CheckboxContainer = styled.div<{
  checked: boolean;
  checkboxSizeVariant: CheckboxProps['checkboxSizeVariant'];
  checkboxColorVariant: CheckboxProps['checkboxColorVariant'];
}>`
  width: ${({ checkboxSizeVariant }) =>
    checkboxSizeVariant === 'small' ? '24px' : '32px'};
  aspect-ratio: 1;
  background-color: ${({ checked, checkboxColorVariant }) =>
    checked ? getCheckedColor(checkboxColorVariant) : '#ECF1F4'};
  border-radius: 8px;
  box-shadow: 0px 2px 2px -1px #4a4a681a inset;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const StyledCheckbox = styled.input`
  opacity: 0;
  position: absolute;
  width: 32px;
  height: 32px;
  cursor: pointer;
`;

const SuccessIconStyled = styled(Icon.Success)<{ checked: boolean }>`
  width: 20px;
  height: 20px;
  visibility: ${(props) => (props.checked ? 'visible' : 'hidden')};
`;

const CheckboxLabel = styled(Text.SmallestLight)``;
