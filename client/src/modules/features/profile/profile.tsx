import { useForm } from "@/core/hooks/useForm";
import { useModal } from "@/core/hooks/useModal";
import useNavigation from "@/core/hooks/useNavigate";
import useAuthStore from "@/core/store/auth";
import { useEffect } from "react";
import { realEstateSchema } from "./validations/realEstates.schema";
import { addREToDB, fetchUser } from "./api/endpoints";
import { ModalCreatePropierty } from "./components/modalCreatePropierty";
import { ProfileHeader } from "./components/profileHeader";
import { ContactInfo } from "./components/contactInfo";
import { PublicationsAndFavorites } from "./components/publicationsAndFavorites";
import { useQuery } from "@tanstack/react-query";
import { fetchRealEstates } from "../home/api/endpoints";
import { User } from "@/core/types/user";
import { ModalEditUser } from "./components/modalEditUser";

const DashboardPage = () => {
  const { user } = useAuthStore();
  const { handleNavigate } = useNavigation();
  const { ShowModal, handleStateModal, modalStates } = useModal();

  const {
    register,
    handleOnSubmit,
    errors,
    isPending: isPendingRealEstate,
  } = useForm({
    schema: realEstateSchema,
    form: async (data) => {
      if (user) {
        await addREToDB(data, user);
      }
    },
  });

  useEffect(() => {
    if (user === null) {
      handleNavigate("/auth");
    }
  }, [user]);

  const { isLoading, data: realEstate } = useQuery({
    queryKey: ["realEstate"],
    queryFn: () => fetchRealEstates(),
  });
  return (
    <div className="flex h-screen  m-5">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="w-full ">
          <ProfileHeader />
        </div>
        <div className=" w-full  mt-6 md:mt-0 ">
          <ModalEditUser
            ShowModal={ShowModal}
            handleStateModal={() => handleStateModal("editUser")}
            isModalOpen={modalStates["editUser"] || false}
          />
          <ModalCreatePropierty
            ShowModal={ShowModal}
            errors={errors}
            handleOnSubmit={handleOnSubmit}
            handleStateModal={() => handleStateModal("createProperty")}
            isModalOpen={modalStates["createProperty"] || false}
            isPendingRe={isPendingRealEstate}
            register={register}
          />
          <ContactInfo user={user ? user : ({} as User)} />
          <PublicationsAndFavorites
            ShowModal={ShowModal}
            handleStateModal={handleStateModal}
            modalStates={modalStates}
          />
          {isLoading && <p>Loading...</p>}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
