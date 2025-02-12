import { storage } from "@/core/libs/firebase";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { ChangeEvent, useEffect, useState } from "react";
import { FileSelectedType, FileUpType } from "../profile/profile";
import { UploadImageIcon } from "@/shared/assets/icons/uploadImage";
import { ArrowDownIcon } from "@/shared/assets/icons/arrowDown";
import { useLanguageStore } from "@/core/store/language";
import { TrashIcon } from "@/shared/assets/icons/trash";
import { useParams } from "react-router-dom";

type ParamsType = {
    nameFolder:string
};
export const UplaodFiles = () => {
  const { nameFolder } = useParams<ParamsType>();

  const [filesSelected, setFilesSelected] = useState<FileSelectedType[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<FileUpType[]>([]);
  const [isUploaded, setIsUploaded] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState(false);
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

  const toggleExpand = () => setIsExpanded(!isExpanded);
  const { language, texts } = useLanguageStore();

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

  useEffect(() => {
    //@ts-ignore
    window.uploadedFiles = uploadedFiles;
  }, [uploadedFiles]);

  return (
    <>
      <div className="flex flex-col gap-2 ">
        <input
          type="file"
          id="fileInput"
          className="hidden"
          onChange={handleImageSelection}
          multiple
          accept="/*"
        />
        <div
          className="flex max-w-max p-2  gap-2 rounded-lg"
          style={{ background: "#353535" }}
        >
          <UploadImageIcon size="20" />
          <label htmlFor="fileInput" className="text-white cursor-pointer">
            {"subir"}
          </label>
        </div>
      </div>

      <div>
        {filesSelected.length !== 0 && (
          <>
            <button onClick={toggleExpand} className="flex items-center gap-2">
              <ArrowDownIcon size="15" />
              <span>
                {countFilesUp}
                {language === "es" || language === "pt" ? " de " : " of "}
                {filesSelected.length} {texts.filesUplodesLanguage}
              </span>
            </button>
            {isExpanded && (
              <div className="max-h-64 overflow-y-auto">
                {filesSelected.map((value, index) => (
                  <div key={index}>
                    <ul className="flex flex-col gap-5 py-3 px-3 ">
                      <div className="flex items-center w-full  ">
                        <span className="px-2 text-center rounded-full bg-secondary text-white text-xs">
                          {index + 1}
                        </span>
                        <div className="w-5 h-[3px] bg-secondary ml-1" />
                        <div className="flex border-2 border-[#d3d3d3] h-16 w-full items-center gap-5 ">
                          {filesSelected[index].status === true ? (
                            <span className="basis-3/12 md:basis-2/12 flex justify-center items-center">
                              <span className="w-12 h-12 border-4 border-black border-b-transparent rounded-full inline-block animate-spin"></span>
                            </span>
                          ) : (
                            <img
                              className="basis-3/12 md:basis-2/12 p-0 h-full w-full"
                              src={uploadedFiles[index]?.url}
                              alt="image"
                            />
                          )}

                          <div className="basis-8/12 md:basis-9/12 flex overflow-hidden text-ellipsis whitespace-nowrap flex-col">
                            <span className="w-[270px] overflow-hidden text-ellipsis whitespace-nowrap">
                              {value.name}
                            </span>
                            <span>
                              {value.size && (value?.size / 1024).toFixed(2)} KB
                            </span>
                          </div>

                          <button
                            onClick={() => handleDeleteFile(index)}
                            className="text-red-400 text-xl font-semibold px-5"
                          >
                            <TrashIcon size="20" />
                          </button>
                        </div>
                      </div>
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};
