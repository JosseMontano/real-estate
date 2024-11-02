import { useState } from "react";

export type ModalType = {
    children: React.ReactNode;
    title: string;
};
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