import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";

import { useUserProfile } from "@/api/user/hooks";
import BodyGradientImage from "@/assets/images/BodyGradient.png";

import CircumferenceTile from "./CircumferenceTile";
import { circumferenceTiles } from "./configs";
import ModalInput from "./ModalInput";
import { CircumferenceType } from "./types";

const BodyMetrics = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalActiveType, setModalActiveType] =
    useState<CircumferenceType | null>();

  const { data: userData } = useUserProfile();

  const closeModal = () => {
    setIsModalOpen(false);
    setModalActiveType(null);
  };

  const combinedValues = [...circumferenceTiles];

  return (
    <Container>
      <BodyImage src={BodyGradientImage} alt="body image" priority />
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
      {modalActiveType && (
        <ModalInput
          initialValue={userData?.[modalActiveType] || 0}
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          type={
            combinedValues.find((tile) => tile.type === modalActiveType)
              ?.title || ""
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
