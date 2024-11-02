import Image from 'next/image';
import { useState } from 'react';
import styled from 'styled-components';

import { useUserProfile } from '@/api/user/hooks';
import BodyGradientImage from '@/assets/images/BodyGradient.png';

import CircumferenceTile from './CircumferenceTile';
import { circumferenceTiles, compositionItems } from './configs';
import ModalInput from './ModalInput';
import { CircumferenceType, CompositionType } from './types';

// const data = [
//   {
//     type: 'muscle',
//     value: 30,
//   },
//   {
//     type: 'essentialFat',
//     value: 20,
//   },
//   {
//     type: 'storageFat',
//     value: 10,
//   },
//   {
//     type: 'bone',
//     value: 40,
//   },
//   {
//     type: 'other',
//     value: 50,
//   },
// ];

const BodyMetrics = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalActiveType, setModalActiveType] = useState<
    CircumferenceType | CompositionType | null
  >();

  const { data: userData } = useUserProfile();

  const closeModal = () => {
    setIsModalOpen(false);
    setModalActiveType(null);
  };

  const combinedValues = [...circumferenceTiles, ...compositionItems];

  return (
    <Container>
      <BodyImage src={BodyGradientImage} alt="body image" />
      <Circumferences>
        {circumferenceTiles.map(({ title, type }) => (
          <CircumferenceTile
            key={type}
            title={title}
            type={type}
            value={userData?.[type]}
            onClick={(activeType: CircumferenceType) => {
              setIsModalOpen(true);
              setModalActiveType(activeType);
            }}
          />
        ))}
      </Circumferences>
      {/* <Composition>
        {compositionItems.map(({ title, type }) => (
          <CompositionItem
            key={type}
            name={title}
            percentage={data.find((item) => item.type === type)?.value || 0}
            // onClick={(activeType: CompositionType) => {
            //   setIsModalOpen(true);
            //   setModalActiveType(activeType);
            // }}
          />
        ))}
      </Composition> */}
      {/* <MetricsTable metrics={data.metrics} /> */}

      {modalActiveType && (
        <ModalInput
          initialValue={userData[modalActiveType] || 0}
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          type={
            combinedValues.find((tile) => tile.type === modalActiveType)
              ?.title || ''
          }
          typeValue={modalActiveType}
        />
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

const BodyImage = styled(Image)`
  width: auto;
  height: 253px;
  aspect-ratio: 100/253;
`;

const Circumferences = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  height: 100%;
`;

// const Composition = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 20px;
// `;

export default BodyMetrics;
