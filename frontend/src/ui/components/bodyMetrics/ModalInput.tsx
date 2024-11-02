import { useForm } from 'react-hook-form';
import Modal from 'react-modal';
import styled from 'styled-components';

import { useUpdateExtendedUserProfile } from '@/api/user/hooks';
import Button from '@/components/controls/Button';
import FormField from '@/components/FormField';
import Text from '@/components/Text';

type ModalInputProps = {
  initialValue: number;
  type: string;
  typeValue: string;
  unit?: string;
  isModalOpen: boolean;
  closeModal: () => void;
};

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const ModalInput = ({
  initialValue,
  type,
  typeValue,
  unit = 'cm',
  isModalOpen,
  closeModal,
}: ModalInputProps) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      value: initialValue || null,
    },
  });

  const { mutate: updateExtendedUserProfile } = useUpdateExtendedUserProfile();

  const onSubmit = (data: { value: number | null }) => {
    const { value } = data;

    if (value === null) return;

    updateExtendedUserProfile(
      {
        [typeValue]: +value,
      },
      {
        onSuccess: () => {
          closeModal();
        },
        onError: (error) => {
          // @ts-expect-error - error type is not defined
          const messages = error.response.data.message;

          alert(messages.map((message: string) => message).join('\n'));
        },
      },
    );
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      style={customStyles}
    >
      <Container>
        <Title>Input your {type.toLocaleLowerCase()} circumference</Title>
        <FormField
          label={`${type} (${unit})`}
          placeholder={`${type} value`}
          name="value"
          control={control}
        />
        <ButtonsContainer>
          <Button
            onClick={() => {
              handleSubmit(onSubmit)();
            }}
          >
            Set {type}
          </Button>
          <Button onClick={closeModal} variant="tertiary">
            Close
          </Button>
        </ButtonsContainer>
      </Container>
    </Modal>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Title = styled(Text.H3)`
  margin-bottom: 30px;
  text-align: center;
  width: 100%;
  max-width: 220px;
`;

export default ModalInput;
