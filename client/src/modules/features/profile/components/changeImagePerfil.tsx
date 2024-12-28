import { UploadImageIcon } from "@/shared/assets/icons//uploadImage";
import { useLanguageStore } from "@/core/store/language";

type ParamasType = {
  setFile: (name: File) => void;
  file: File | null;
  imgUrl: string;
  oldPhoto: string;
};

export const ProfileImageUploader: React.FC<ParamasType> = ({
  setFile,
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
    <div className="flex flex-row justify-between gap-2">
      <input
        type="file"
        id="fileInput"
        onChange={handleImageChange}
        className="hidden"
      />
      <div
        className="flex items-center max-w-max h-[40px] px-2 py-1 gap-2 rounded-lg text-white"
        style={{ background: "#353535" }}
      >
        <UploadImageIcon size="20" />
        <label htmlFor="fileInput" className=" cursor-pointer text-[14px]">
          {texts.searchImage}
        </label>
      </div>
{/*       <p>{file.name}</p>
 */}      {imgUrl != "" ? (
        <img className="w-[40px] h-[40px] rounded-full" src={imgUrl} alt="" />
      ) : oldPhoto != "" ? (
        <img className="w-[40px] h-[40px] rounded-full" src={oldPhoto} alt="" />
      ) : (
        <p>No hay imagen de perfil</p>
      )}
    </div>
  );
};
