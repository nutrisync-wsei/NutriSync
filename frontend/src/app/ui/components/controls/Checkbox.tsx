import { useState } from 'react';
import styled from 'styled-components';
import Icon from '@/app/assets/Icon';

interface CheckboxProps {
    initialState?: boolean;
    onChange?: (checked: boolean) => void;
}

const Checkbox = ({
    initialState = false,
    onChange
}: CheckboxProps) => {
    const [checked, setChecked] = useState(initialState);

    const toggleCheckbox = () => {
        setChecked(!checked);
        if (onChange) {
            onChange(!checked);
        }
    };

    return (
        <CheckboxContainer checked={checked} onClick={toggleCheckbox}>
            <StyledCheckbox
                type="checkbox"
                checked={checked}
                onChange={toggleCheckbox}
            />
            <SuccessIconStyled checked={checked} />
        </CheckboxContainer>
    );
};

export default Checkbox;

const CheckboxContainer = styled.div<{ checked: boolean }>`
  width: 32px;
  height: 32px;
  background-color: ${(props: { checked: boolean }) =>
        props.checked ? '#D0FFC3' : '#ECF1F4'};
  border-radius: 8px;
  box-shadow: 0px 2px 2px -1px #4A4A681A inset;
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

// TODO: Fix svg so that it uses #121212 instead of currentColor property
const SuccessIconStyled = styled(Icon.Success) <{ checked: boolean }>`
  color: #FFFFFF;
  width: 20px;
  height: 20px;
  visibility: ${(props) => props.checked ? 'visible' : 'hidden'};
`;