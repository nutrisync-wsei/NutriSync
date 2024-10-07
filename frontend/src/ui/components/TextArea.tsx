import styled from 'styled-components';

interface TextAreaProps {
  placeholder?: string;
}

const TextArea = ({ placeholder }: TextAreaProps) => {
  return <StyledTextArea placeholder={placeholder} />;
};

const StyledTextArea = styled.textarea`
  width: 300px;
  min-height: 90px;
  max-height: 200px;
  resize: vertical;
  border-radius: 8px;
  padding: 12px 16px;
  background-color: #ecf1f4;
  color: #8c8ca1;
  border: none;

  &:focus {
    outline: none;
  }

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #8c8ca1;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background: #ecf1f4;
  }
`;

export default TextArea;
