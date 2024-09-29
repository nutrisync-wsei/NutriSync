import FormLabel from "./FormLabel";
import TextField from "./controls/TextField";
import Helper from "./Helper";
import styled from "styled-components";
import { useController } from "react-hook-form";
import { Control, FieldValues, Path, RegisterOptions } from "react-hook-form";

type FormFieldProps<T extends FieldValues> = {
  label: string;
  placeholder: string;
  helper?: string;
  fieldVariant?: "text" | "password" | "email";
  control: Control<T>;
  name: Path<T>;
  rules?: Pick<
    RegisterOptions<T>,
    "maxLength" | "minLength" | "pattern" | "validate" | "required"
  >;
};

const FormField = <T extends FieldValues>({
  label,
  placeholder,
  helper,
  name,
  fieldVariant,
  control,
  rules,
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
      />

      <Helper
        label={errorMessage || helper}
        type={errorMessage ? "error" : "info"}
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
