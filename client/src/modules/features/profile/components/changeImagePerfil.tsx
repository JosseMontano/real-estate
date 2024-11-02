import React, { useState } from "react";
import {
  storage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "@/core/libs/firebase";
import Btn from "@/core/components/form/button";
import { ModalType } from "@/core/hooks/useModal";
import { UploadImage } from "@/shared/assets/icons/uploadImage";
type ParamasType = {
  onImageUpload: (url: string) => void;
  handleStateModal: () => void;
  isModalOpen: Boolean;
  ShowModal: ({ children, title, modalId }: ModalType) => JSX.Element;
};

export const ProfileImageUploader: React.FC<ParamasType> = ({
  onImageUpload,
  ShowModal,
  handleStateModal,
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
  return (
    <div className="flex flex-col gap-4">
      <Btn
        isPending={false}
        text="Editar imagen"
        className="max-w-max px-2"
        onClick={handleStateModal}
      />
      {isModalOpen && (
        <ShowModal
          modalId="editImageUser"
          title="Cambiar foto de perfil"
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
                <UploadImage size="20" />
                <label
                  htmlFor="fileInput"
                  className="text-white cursor-pointer"
                >
                  Buscar imagen
                </label>
              </div>
              <p>{fileName || ""}</p>
              {/* Muestra el nombre del archivo o vacío */}
              <Btn
                isPending={false}
                text={loading ? "Subiendo..." : "Subir imagen"}
                className="max-w-max px-2"
                onClick={handleUpload}
              />
            </div>
          }
        />
      )}
    </div>
  );
};
