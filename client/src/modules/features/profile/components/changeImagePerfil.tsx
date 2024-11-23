import React, { useState } from "react";
import {
  storage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "@/core/libs/firebase";
import Btn from "@/core/components/form/button";

import { UploadImageIcon } from "@/shared/assets/icons//uploadImage";
import { ShowModal } from "@/core/components/form/modal";
import { useLanguageStore } from "@/core/store/language";
type ParamasType = {
  onImageUpload: (url: string) => void;
  isModalOpen: boolean;
  handleShowModal: () => void;
};

export const ProfileImageUploader: React.FC<ParamasType> = ({
  onImageUpload,
  handleShowModal,
  isModalOpen,
}) => {
  const [image, setImage] = useState<File | null>(null);
  const [URL, setURL] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setFileName(e.target.files[0].name);
    } else {
      setFileName("");
    }
  };

  const handleUpload = async () => {
    if (!image) return;
    setLoading(true);
    const storageRef = ref(storage, `profile-images/${image.name}`);
    await uploadBytes(storageRef, image);
    const url = await getDownloadURL(storageRef);
    onImageUpload(url); // Llama a la función del padre con la URL de la imagen
    handleChangeUrl(url);
    setLoading(false);
  };

  const handleChangeUrl = (url: string) => {
    setURL(url);
  };
  const { language, texts } = useLanguageStore();
  return (
    <div className="flex flex-col gap-4">
      <Btn
        isPending={false}
        text={
          language == "es"
            ? "Editar imagen"
            : language == "en"
            ? "Edit image"
            : "Editar imagem"
        }
        className="max-w-max px-2"
        onClick={handleShowModal}
      />

      <ShowModal
        title={
          language === "es"
            ? "Cambiar foto de perfil"
            : language === "en"
            ? "Change profile photo"
            : "Modificar foto de perfil"
        }
        isModalOpen={isModalOpen}
        setIsModalOpen={handleShowModal}
        children={
          <div className="flex flex-col gap-2 ">
            {URL ? (
              <img className="w-96" src={URL} alt="Profile" />
            ) : (
              <p>No hay imagen de perfil</p>
            )}
            <input
              type="file"
              id="fileInput"
              onChange={handleImageChange}
              className="hidden"
            />
            <div
              className="flex max-w-max p-2  gap-2 rounded-lg"
              style={{ background: "#353535" }}
            >
              <UploadImageIcon size="20" />
              <label htmlFor="fileInput" className="text-white cursor-pointer">
                {texts.searchImage}
              </label>
            </div>
            <p>{fileName || ""}</p>
            <Btn
              isPending={false}
              text={loading ? "Subiendo..." : "Subir imagen"}
              className="max-w-max px-2"
              onClick={handleUpload}
            />
          </div>
        }
      />
    </div>
  );
};
