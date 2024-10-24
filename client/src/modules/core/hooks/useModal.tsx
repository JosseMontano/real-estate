import { useState } from "react";

type ModalType = {
    children: React.ReactNode;
    title: string;
};
export const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleStateModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  function ShowModal({ children, title }: ModalType) {
    return (
      <>
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={(e)=>{
            if (e.target === e.currentTarget) {
                setIsModalOpen(false);
              }
          }}>
            <div
              style={{
                animation: "modal 0.7s ease-out",
              }}
              className={`bg-white p-5 rounded-lg shadow-lg transform transition-transform duration-300 ${
                isModalOpen
                  ? "translate-y-0 opacity-100"
                  : "-translate-y-full opacity-0"
              }`}
            >
              <span
                className="absolute top-0 right-2 cursor-pointer"
                onClick={() => setIsModalOpen(false)}
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
    isModalOpen,
    handleStateModal,
    ShowModal,
  };
};
