import { RealEstate } from "@/shared/types/realEstate";
import PhotoNOAvailable from "@/shared/assets//photo-no-available.jpg";

type ParamsType = {
    publication: RealEstate
    setSelectedRE: (re: RealEstate) => void;
    handleShowModal: () => void;
}
export const RealEstateComp = ({publication, handleShowModal, setSelectedRE}:ParamsType) => {
    return (
        <div
              key={publication.id}
              className="flex flex-col justify-center items-center gap-1"
            >
              <img
                src={
                  publication.photos.length > 0
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
}