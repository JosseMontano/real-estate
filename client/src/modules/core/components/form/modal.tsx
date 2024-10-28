
type Props = {
    children: React.ReactNode;
    title: string;
    isModalOpen: boolean;
    setIsModalOpen: () => void;

}
export const ShowModal = ({children,title, isModalOpen, setIsModalOpen}:Props) => {
    return (
        <>
              {isModalOpen && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setIsModalOpen()
              }
            }}
          >
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
                onClick={() => setIsModalOpen()}
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
};

