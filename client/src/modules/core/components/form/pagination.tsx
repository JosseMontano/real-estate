
type Props = {
    amountOfPages:number
    currentPage:number
    primaryColor:string
    handlePagination:(page:number)=>void
    lastPage:number
}
const Pagination = (props:Props) => {
    const {amountOfPages, currentPage, primaryColor, handlePagination,  lastPage} = props
    return (

        <div className="flex justify-end">
        <div className="flex py-2 flex-row justify-center gap-3 w-[250px] shadow rounded-[25px]">
          <button onClick={()=>handlePagination(currentPage-1)} disabled={currentPage==1}>{"<"}</button>
          {Array.from({ length: amountOfPages }, (_, i) => (
            <button
              className="text-sm w-7 h-7 rounded-full"
              style={{
                backgroundColor: i + 1 === currentPage ? primaryColor : "white",
                color: i + 1 === currentPage ? "white" : "black",
              }}
              onClick={() => handlePagination(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button disabled={lastPage == currentPage} onClick={()=>handlePagination(currentPage+1)}>{">"}</button>
        </div>
      </div>
    );
};

export default Pagination;