import {
  Control,
  FieldValues,
  Path,
  RegisterOptions,
  useController,
} from 'react-hook-form';
import styled from 'styled-components';

import TextField from './controls/TextField';
import FormLabel from './FormLabel';
import Helper from './Helper';

type FormFieldProps<T extends FieldValues> = {
  label: string;
  placeholder: string;
  helper?: string;
  fieldVariant?: 'text' | 'password' | 'email';
  control: Control<T>;
  name: Path<T>;
  rules?: Pick<
    RegisterOptions<T>,
    'maxLength' | 'minLength' | 'pattern' | 'validate' | 'required'
  >;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

const FormField = <T extends FieldValues>({
  label,
  placeholder,
  helper,
  name,
  fieldVariant,
  control,
  rules,
  onKeyDown,
}: FormFieldProps<T>) => {
  const {
    field: { value, onChange, onBlur },
    fieldState: { error: inputError },
  } = useController({
    name: name,
    control: control,
    rules: rules,
  });

  const { message: errorMessage } = inputError || {};

  return (
    <StyledWrapper>
      <FormLabel htmlFor={name} label={label} />
      <TextField
        id={name}
        name={name}
        placeholder={placeholder}
        type={fieldVariant}
        hasError={!!inputError}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
      />

      <Helper
        label={errorMessage || helper}
        type={errorMessage ? 'error' : 'info'}
      />
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export default FormField;
