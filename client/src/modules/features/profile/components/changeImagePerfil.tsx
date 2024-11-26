import { UploadImageIcon } from "@/shared/assets/icons//uploadImage";
import { useLanguageStore } from "@/core/store/language";

type ParamasType = {
  setFile: (name: File) => void;
  file: File;
  imgUrl: string;
  oldPhoto: string;
};

export const ProfileImageUploader: React.FC<ParamasType> = ({
  setFile,
  file,
  imgUrl,
  oldPhoto,
}) => {
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedImage = e.target.files[0];
      setFile(selectedImage);
    }
  };

  const { texts } = useLanguageStore();

  return (
    <div className="flex flex-col gap-2">
      {imgUrl != "" ? (
        <img className="w-12 h-12" src={imgUrl} alt="" />
      ) : oldPhoto != "" ? (
        <img className="w-12 h-12" src={oldPhoto} alt="" />
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
        className="flex max-w-max p-2 gap-2 rounded-lg"
        style={{ background: "#353535" }}
      >
        <UploadImageIcon size="20" />
        <label htmlFor="fileInput" className="text-white cursor-pointer">
          {texts.searchImage}
        </label>
      </div>
      <p>{file.name}</p>
    </div>
  );
};
