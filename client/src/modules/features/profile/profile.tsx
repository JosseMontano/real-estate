import { useForm } from "@/core/hooks/useForm";
import { useModal } from "@/core/hooks/useModal";
import useNavigation from "@/core/hooks/useNavigate";
import useAuthStore from "@/core/store/auth";
import { ChangeEvent, useEffect, useState } from "react";
import { realEstateSchema } from "./validations/realEstates.schema";
import { addREToDB } from "./api/endpoints";
import { Location } from "@/core/components/map/maps";
import { getTheValues } from "./utils/getTheValues";
import {
  uploadBytes,
  ref,
  storage,
  getDownloadURL,
} from "@/core/libs/firebase";
import { TypeRE } from "@/shared/types/realEstate";
import { ModalCreatePropierty } from "./components/modalCreatePropierty";
import { ProfileHeader } from "./components/profileHeader";
import { ContactInfo } from "./components/contactInfo";
import { PublicationsAndFavorites } from "./components/publicationsAndFavorites";
import { useQuery } from "@tanstack/react-query";
import { fetchRealEstates } from "../home/api/endpoints";

const DashboardPage = () => {
  const { user } = useAuthStore();
  const { handleNavigate } = useNavigation();
  const { handleStateModal, isModalOpen } = useModal();
  const [location, setLocation] = useState<Location | null>(null);
  const [typeRE, setTypeRE] = useState({} as TypeRE);

  const [uploadStatus, setUploadStatus] = useState<string[]>([]);
  const [fileUrls, setFileUrls] = useState<string[]>([]);

  const { handleStateModal: handleShowRE, isModalOpen: ShowRE } = useModal();

  const {
    register,
    handleOnSubmit,
    errors,
    isPending: isPendingRealEstate,
    reset,
  } = useForm({
    schema: realEstateSchema,
    form: async (data) => {
      if (user) {
        const res = await getTheValues(data, location);
        data = res;

        await addREToDB(data, user, fileUrls, typeRE);

        handleStateModal();
        reset();
      }
    },
  });

  useEffect(() => {
    if (user === null) {
      handleNavigate("/auth");
    }
  }, [user]);

  const handleImageSelection = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);

      const uploadPromises = fileArray.map(async (file) => {
        const uniqueFileName = `${file.name}-${crypto.randomUUID()}`;
        const nameFolder = user?.email?.split("@")[0];
        const storageRef = ref(
          storage,
          `realEstates/${nameFolder}/${uniqueFileName}`
        );

        try {
          await uploadBytes(storageRef, file);
          const downloadUrl = await getDownloadURL(storageRef);
          setFileUrls((prevUrls) => [...prevUrls, downloadUrl]); // Save U
          setUploadStatus((prev) => [
            ...prev,
            `${file.name} uploaded successfully`,
          ]);
        } catch (error) {
          setUploadStatus((prev) => [...prev, `Error uploading ${file.name}`]);
          console.error(`Error uploading ${file.name}`, error);
        }
      });

      await Promise.all(uploadPromises);
      console.log("All files uploaded!");
    }
  };

  const { isLoading } = useQuery({
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
          <ModalCreatePropierty
            errors={errors}
            handleOnSubmit={handleOnSubmit}
            handleStateModal={handleStateModal}
            isModalOpen={isModalOpen}
            handleImageSelection={handleImageSelection}
            isPendingRE={isPendingRealEstate}
            uploadStatus={uploadStatus}
            setTypeRE={setTypeRE}
            typeRE={typeRE}
            location={location}
            setLocation={setLocation}
            register={register}
          />
          <ContactInfo />
          <PublicationsAndFavorites
            isModalOpen={ShowRE}
            handleStateModal={handleShowRE}
          />
          {isLoading && <p>Loading...</p>}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
