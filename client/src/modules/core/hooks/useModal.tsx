import { useState } from "react";

export const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleStateModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  return {
    isModalOpen,
    handleStateModal,
  };
};
