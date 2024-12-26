import { RealEstate } from "@/shared/types/realEstate";
import PhotoNOAvailable from "@/shared/assets//photo-no-available.jpg";
import { TrashIcon } from "@/shared/assets/icons/trash";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../../App";
import { deleteFavRe } from "../api/endpoints";
import { User } from "@/core/types/user";
import { useState } from "react";

type ParamsType = {
  publication: RealEstate;
  setSelectedRE: (re: RealEstate) => void;
  handleShowModal: () => void;
  showIcon?: boolean;
  userLogged: User;
  removeFavorite: (realEstateId: number) => void;
};
export const RealEstateComp = ({
  publication,
  handleShowModal,
  setSelectedRE,
  showIcon = false,
  userLogged,
  removeFavorite,
}: ParamsType) => {
  const { mutate: deleteFav } = useMutation({
    mutationFn: () => deleteFavRe(publication.id ?? 0, userLogged.id ?? 0),
    onSuccess: () => {
      removeFavorite(publication.id ?? 0);
      queryClient.invalidateQueries({
        queryKey: ["favs-real-estates", userLogged?.id],
      });
    },
  });
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      key={publication.id}
      className="flex flex-col justify-center items-center gap-1 relative"
    >
      {showIcon && (
        <div
          onClick={() => deleteFav()}
          className="cursor-pointer absolute top-1 right-1"
        >
          <TrashIcon size="22" />
        </div>
      )}

      {!imageLoaded && (
        <div className="w-[260px] h-[220px] rounded-lg shadow-lg bg-gray-300 animate-pulse"></div>
      )}

       {/* Render the image only when it has fully loaded */}
       {imageLoaded && (
        <img
          src={
            publication.photos != undefined
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
      )}

      {/* Preload the image */}
      <img
        src={
          publication.photos != undefined
            ? publication.photos[0].image
            : PhotoNOAvailable
        }
        alt="Preload"
        className="hidden"
        onLoad={() => setImageLoaded(true)}
      />
    </div>
  );
};
