type Props = {
  currentPage: number;
  primaryColor: string;
  handlePagination: (page: number) => void;
  lastPage: number;
};

const Pagination = (props: Props) => {
  const {
    currentPage,
    primaryColor,
    handlePagination,
    lastPage,
  } = props;

  const getVisiblePages = () => {
    const startPage = Math.max(1, currentPage - 1); 
    const endPage = Math.min(lastPage, currentPage + 1); 
    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

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
        {getVisiblePages().map((page) => (
          <button
            key={page}
            className={`w-8 h-8 flex items-center justify-center border rounded-md ${
              page === currentPage
                ? "text-white"
                : "text-black border-gray-300"
            }`}
            style={{
              backgroundColor: page === currentPage ? primaryColor : "white",
            }}
            onClick={() => handlePagination(page)}
          >
            {page}
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
