import { RealEstate } from "@/shared/types/realEstate";
import PhotoNOAvailable from "@/shared/assets//photo-no-available.jpg";
import { TrashIcon } from "@/shared/assets/icons/trash";

type ParamsType = {
  publication: RealEstate;
  setSelectedRE: (re: RealEstate) => void;
  handleShowModal: () => void;
  showIcon?: boolean;
  deleteFav?: any;
  favREiD?:number
};
export const RealEstateComp = ({
  publication,
  handleShowModal,
  setSelectedRE,
  showIcon = false,
  deleteFav,
  favREiD = 0
}: ParamsType) => {
  return (
    <div
      key={publication.id}
      className="relative flex flex-col justify-center items-center gap-1"
    >
      {showIcon && (
        <div
          onClick={() => {
            deleteFav && deleteFav(favREiD.toString());
          }}
          className="cursor-pointer absolute top-1 right-1"
        >
          <TrashIcon size="22" />
        </div>
      )}
      <img
        src={
          publication.photos !=undefined 
            ? publication.photos[0].image
            : PhotoNOAvailable
        }
        alt="Imagen"
        className="w-[260px] h-[220px] rounded-lg shadow-lg object-cover cursor-pointer"
        onClick={() => {
          setSelectedRE(publication);
          handleShowModal();
        }}
      />
    </div>
  );
};
