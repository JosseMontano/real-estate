type ParamsType = {
    img:string
}
export const Photo = ({img}:ParamsType) => {
    return (
        
        <div className="flex justify-center w-full md:w-1/2">
        <img
          src={img}
          alt="Imagen"
          className="w-full max-w-xs md:max-w-md lg:max-w-lg h-auto rounded-lg shadow-lg"
        />
      </div>
    );
}