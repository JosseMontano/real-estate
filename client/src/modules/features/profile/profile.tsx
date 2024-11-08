import { useForm } from "@/core/hooks/useForm";
import { useModal } from "@/core/hooks/useModal";
import useNavigation from "@/core/hooks/useNavigate";
import useAuthStore from "@/core/store/auth";
import { ChangeEvent, useEffect, useState } from "react";
import { realEstateSchema } from "./validations/realEstates.schema";
import { addREToDB, fetchCommentsForUser } from "./api/endpoints";
import { ModalCreatePropierty } from "./components/modalCreatePropierty";
import { ProfileHeader } from "./components/profileHeader";
import { ContactInfo } from "./components/contactInfo";
import { PublicationsAndFavorites } from "./components/publicationsAndFavorites";
import { useQuery } from "@tanstack/react-query";
import { fetchRealEstates } from "../home/api/endpoints";
import { User } from "@/core/types/user";
import { ModalEditUser } from "./components/modalEditUser";
import {
  ref,
  storage,
  uploadBytes,
  getDownloadURL,
} from "@/core/libs/firebase";
import { TypeRE } from "@/shared/types/realEstate";
import { Location } from "@/core/components/map/maps";

const DashboardPage = () => {
  const { user } = useAuthStore();
  const { handleNavigate } = useNavigation();
  const {
    handleStateModal: handleShowAddComment,
    isModalOpen: isAddCommentOpen,
  } = useModal();
  const { handleStateModal: handleShowEditUser, isModalOpen: isEditUserOpen } =
    useModal();
  const { handleStateModal: handleShowCreateRE, isModalOpen: isCreateREOpen } =
    useModal();
  const { handleStateModal: handleShowFav, isModalOpen: isFavOpen } =
    useModal();
  const {
    handleStateModal: handleShowUploadImage,
    isModalOpen: isOpenUpImage,
  } = useModal();
  const {
    register,
    handleOnSubmit,
    errors,
    isPending: isPendingRealEstate,
  } = useForm({
    schema: realEstateSchema,
    form: async (data) => {
      if (user) {
        //await addREToDB(data, user);
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

  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);

  const handleImageUpload = (url: string) => {
    setProfileImageUrl(url);
  };

  const { isLoading: loadingComments, data: comments } = useQuery({
    queryKey: ["comments"],
    queryFn: () => fetchCommentsForUser(user?.id || ""),
  });

  const [uploadStatus, setUploadStatus] = useState<string[]>([]);
  const [fileUrls, setFileUrls] = useState<string[]>([]);

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
  const [typeRE, setTypeRE] = useState({} as TypeRE);
  const [location, setLocation] = useState<Location | null>(null);
  return (
    <div className="flex h-screen w-auto  mx-2 mt-2 gap-4 flex-wrap md:flex-nowrap">
      <div className="md:basis-3/12 grow-0 w-full md:pr-16">
        <ProfileHeader
          profileImageUrl={profileImageUrl}
          handleShowModal={handleShowAddComment}
          isModalOpen={isAddCommentOpen}
          commets={comments ?? []}
          loading={loadingComments}
          user={user}
        />
      </div>
      <div className="md:basis-9/12 grow w-full">
        <div className="flex gap-5 md:justify-end justify-center">
          <ModalEditUser
            isModaEditUserOpen={isEditUserOpen}
            handleShowModalEditUser={handleShowEditUser}
            handleImageUpload={handleImageUpload}
            handleShowModalUpImage={handleShowUploadImage}
            isModalUpImageOpen={isOpenUpImage}
            
          />
          <ModalCreatePropierty
            errors={errors}
            handleOnSubmit={handleOnSubmit}
            handleStateModal={handleShowCreateRE}
            isModalOpen={isCreateREOpen}
            handleImageSelection={handleImageSelection}
            isPendingRE={isPendingRealEstate}
            uploadStatus={uploadStatus}
            setTypeRE={setTypeRE}
            typeRE={typeRE}
            location={location}
            setLocation={setLocation}
            register={register}
          />
        </div>

        <ContactInfo user={user ? user : ({} as User)} />
        <PublicationsAndFavorites
          handleShowModal={handleShowFav}
          isModalOpen={isFavOpen}
        />
        {isLoading && <p>Loading...</p>}
      </div>
    </div>
  );
};

export default DashboardPage;
