import { useState } from "react";

export type ModalType = {
  children: React.ReactNode;
  title: string;
  modalId: string;
};
export const useModal = () => {
  const [modalStates, setModalStates] = useState<{ [Key: string]: boolean }>(
    {}
  );

  const handleStateModal = (modalId: string) => {
    setModalStates((prev) => ({
      ...prev,
      [modalId]: !prev[modalId],
    }));
  };

  function ShowModal({ children, title, modalId }: ModalType) {
    return (
      <>
        {modalStates[modalId] && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                handleStateModal(modalId);
              }
            }}
          >
            <div
              style={{
                animation: "modal 0.7s ease-out",
              }}
              className="bg-white p-5 rounded-lg shadow-lg transform transition-transform duration-300 translate-y-0 opacity-100"
            >
               <span
                className="absolute top-0 right-2 cursor-pointer"
                onClick={() => handleStateModal(modalId)}
              >
                x
              </span>
              <h2 className="text-2xl mb-4">{title}</h2>
              {children}
            </div>
          </div>
        )}
      </>
    );
  }

  return {
    modalStates,
    handleStateModal,
    ShowModal
  };
};
