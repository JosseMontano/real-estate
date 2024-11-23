type Props = {
  amountOfPages: number;
  currentPage: number;
  primaryColor: string;
  handlePagination: (page: number) => void;
  lastPage: number;
};

const Pagination = (props: Props) => {
  const {
    amountOfPages,
    currentPage,
    primaryColor,
    handlePagination,
    lastPage,
  } = props;

  return (
    <div className="flex justify-center">
      <div className="flex py-2 flex-row justify-center gap-2">
        {/* Botón Anterior */}
        <button
          className={`w-8 h-8 flex items-center justify-center border rounded-md ${
            currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-black"
          }`}
          onClick={() => handlePagination(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {"<"}
        </button>

        {/* Botones de Páginas */}
        {Array.from({ length: amountOfPages }, (_, i) => (
          <button
            key={i}
            className={`w-8 h-8 flex items-center justify-center border rounded-md ${
              i + 1 === currentPage
                ? "text-white"
                : "text-black border-gray-300"
            }`}
            style={{
              backgroundColor: i + 1 === currentPage ? primaryColor : "white",
            }}
            onClick={() => handlePagination(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        {/* Botón Siguiente */}
        <button
          className={`w-8 h-8 flex items-center justify-center border rounded-md ${
            currentPage === lastPage
              ? "text-gray-400 cursor-not-allowed"
              : "text-black"
          }`}
          onClick={() => handlePagination(currentPage + 1)}
          disabled={currentPage === lastPage}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default Pagination;
