import { useForm } from "@/core/hooks/useForm";
import { useModal } from "@/core/hooks/useModal";
import useNavigation from "@/core/hooks/useNavigate";
import useAuthStore from "@/core/store/auth";
import { ChangeEvent, useEffect, useState } from "react";
import { realEstateSchema } from "./validations/realEstates.schema";
import {
  addREToDB,
  fetchCommentsForUser,
  fetchRealEstatesByUserId,
  fetchUserById,
} from "./api/endpoints";
import { ModalCreatePropierty } from "./components/modalCreatePropierty";
import { ProfileHeader } from "./components/profileHeader";
import { ContactInfo } from "./components/contactInfo";
import { PublicationsAndFavorites } from "./components/publicationsAndFavorites";
import { useQuery } from "@tanstack/react-query";
import { User } from "@/core/types/user";
import { ModalEditUser } from "./components/modalEditUser";
import {
  ref,
  storage,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "@/core/libs/firebase";
import { RealEstate, TypeRE } from "@/shared/types/realEstate";
import { Location } from "@/core/components/map/maps";
import useGet from "@/core/hooks/useGet";
import { useLanguageStore } from "@/core/store/language";
import imgDefault from "@/shared/assets/noPhoto.jpg";
import useUserStore from "@/core/store/user";

export type FileSelectedType = {
  name: string;
  size: number;
  status: boolean;
};
export type FileUpType = {
  url: string;
  firebasePath: string;
  error?: string;
};

export type options = "Publications" | "Favorites";

const DashboardPage = () => {
  const { user: userLogged, logout } = useAuthStore();
  const { userSelected } = useUserStore();
  const user = userSelected ?? userLogged;

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
    register,
    handleOnSubmit,
    errors,
    isPending: isPendingRealEstate,
  } = useForm({
    schema: realEstateSchema,
    form: async (data) => {
      if (user) {
        await addREToDB(data);
      }
    },
  });

  const { isLoading, data: realEstates } = useGet({
    queryKey: ["realEstate-by-user", user?.id],
    services: () => fetchRealEstatesByUserId(user?.id ?? 0),
    valueToService: user?.id,
  });


  const { data: comments, isLoading: loadingComments } = useGet({
    services: () => fetchCommentsForUser(user?.id || 0),
    queryKey: ["comments-top-comments-by-user", user?.id],
    itemsPerPage: 10,
    valueToService: user?.id,
  });

  const [isUploaded, setIsUploaded] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<FileUpType[]>([]);
  const [filesSelected, setFilesSelected] = useState<FileSelectedType[]>([]);

  const [countFilesUp, setCountFilesUp] = useState<number>(0);

  const handleImageSelection = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      fileArray.map((file) =>
        setFilesSelected((data) => [
          ...data,
          { name: file.name, size: file.size, status: true },
        ])
      );
      const uploadPromises = fileArray.map(async (file) => {
        const uniqueFileName = `${file.name}-${crypto.randomUUID()}`;
        const nameFolder = user?.email?.split("@")[0];
        const firebasePath = `realEstates/${nameFolder}/${uniqueFileName}`;
        const storageRef = ref(storage, firebasePath);

        try {
          await uploadBytes(storageRef, file);
          const downloadUrl = await getDownloadURL(storageRef);
          setUploadedFiles((prevUrls) => [
            ...prevUrls,
            {
              firebasePath: firebasePath,
              url: downloadUrl,
            },
          ]);
          setIsUploaded(true);
          setCountFilesUp((prev) => prev + 1);
        } catch (error) {
          setUploadedFiles((prev) => [
            ...prev,
            {
              url: "",
              firebasePath,
              error: `Error subiendo ${file.name}`,
            },
          ]);
          console.error(`Error uploading ${file.name}`, error);
        }
      });

      await Promise.all(uploadPromises);
      console.log("All files uploaded!");
    }
  };

  const handleDeleteFile = async (index: number) => {
    const fileToDeleteFirebase = uploadedFiles[index];
    const storageRef = ref(storage, fileToDeleteFirebase.firebasePath);

    const fileToDeleteLocal = filesSelected[index];

    try {
      setFilesSelected((prev) => prev.filter((_, i) => i !== index));
      setCountFilesUp((prev) => prev - 1);
      await deleteObject(storageRef);
    } catch (error) {
      console.error(`Error eliminando ${fileToDeleteLocal.name}`, error);
    }
  };

  useEffect(() => {
    setFilesSelected((prev) =>
      prev.map((file, index) =>
        index === filesSelected.findIndex((v) => v.status === true)
          ? {
              ...file,
              status: false,
            }
          : file
      )
    );
    setIsUploaded(false);
  }, [isUploaded == true]);

  const toggleExpand = () => setIsExpanded(!isExpanded);
  const [typeRE, setTypeRE] = useState({} as TypeRE);
  const [location, setLocation] = useState<Location | null>(null);

  if (user.email == undefined) {
    handleNavigate("/auth");
  }
  const { texts } = useLanguageStore();
  const [currentRE, setCurrentRE] = useState<RealEstate | null>(null);

  const [stateBtn, setStateBtn] = useState<options>("Publications");

  return (
    <div className="h-screen hide_scroll flex items-center w-full">
      <div className="absolute top-0 w-full bg-white flex justify-between px-7 py-4 shadow-2xl h-[72px]">
        <div className="text-2xl font-bold">InmoApp</div>
        <div className="flex gap-3 ">
          <button onClick={logout}>Cerrar sesion</button>
          <img
            className="rounded-full h-10 w-10"
            src={userLogged.photo ?? imgDefault}
            alt="User"
          />
        </div>
      </div>

      <div
        className="grid bg-gray-50 mx-2 mt-2 gap-4 flex-wrap md:flex-nowrap overflow-y-hidden w-full h-full"
        style={{
          gridTemplateColumns: "1fr 3fr",
        }}
      >
        <div className=" grow-0 w-full md:pr-16">
          <ProfileHeader
            handleShowModal={handleShowAddComment}
            isModalOpen={isAddCommentOpen}
            commets={comments ?? []}
            loading={loadingComments}
            user={user}
            commentsLanguage={texts.commentsTitle}
          />
        </div>
        <div className=" grow w-full flex flex-col justify-center ">
          <div className="flex gap-5 md:justify-end justify-center">
            <ModalEditUser
              isModaEditUserOpen={isEditUserOpen}
              handleShowModalEditUser={handleShowEditUser}
              btnEditUserLanguage={texts.btnEditUser}
              btnSaveLanguage={texts.saveButton}
            />
            <ModalCreatePropierty
              errors={errors}
              handleOnSubmit={handleOnSubmit}
              handleStateModal={handleShowCreateRE}
              isModalOpen={isCreateREOpen}
              handleImageSelection={handleImageSelection}
              isPendingRE={isPendingRealEstate}
              setTypeRE={setTypeRE}
              typeRE={typeRE}
              location={location}
              setLocation={setLocation}
              register={register}
              isExpanded={isExpanded}
              toggleExpand={toggleExpand}
              countFilesUp={countFilesUp}
              handleDeleteFile={handleDeleteFile}
              uploadFiles={uploadedFiles}
              filesSelected={filesSelected}
              btnAddReLanguage={texts.btnAddRe}
              btnSaveLanguage={texts.saveButton}
            />
          </div>

          <ContactInfo
            user={user ? user : ({} as User)}
            isModalOpen={isAddCommentOpen}
            HandleSetIsModalOpen={handleShowAddComment}
            addComment={texts.addComment}
            calification={texts.rating}
            favorites={texts.favorites}
            follow={texts.follow}
            placeholderComment={texts.commentPlaceholder}
            publications={texts.posts}
            reportUser={texts.reportUser}
            sendMsg={texts.sendMessage}
            stateBtn={stateBtn}
            setStateBtn={setStateBtn}
          />
          <PublicationsAndFavorites
            handleShowModal={handleShowFav}
            isModalOpen={isFavOpen}
            realEstate={realEstates ?? []}
            setSelectedRE={setCurrentRE}
            selectedRE={currentRE}
            stateBtn={stateBtn}
            user={user}
          />
          {isLoading && <p>Loading...</p>}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
