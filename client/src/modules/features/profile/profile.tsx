import { useForm } from "@/core/hooks/useForm";
import { useModal } from "@/core/hooks/useModal";
import useNavigation from "@/core/hooks/useNavigate";
import useAuthStore from "@/core/store/auth";
import { ChangeEvent, useEffect, useState } from "react";
import { realEstateSchema } from "./validations/realEstates.schema";
import FormComponent from "@/core/components/form/form";
import { Input } from "@/core/components/form/input";
import { addREToDB, fetchTypesRE } from "./api/endpoints";
import { ShowModal } from "@/core/components/form/modal";
import { Location, Map } from "@/core/components/map/maps";
import useGet from "@/core/hooks/useGet";
import { useLanguageStore } from "@/core/store/language";
import Select from "@/core/components/form/select";
import { getTheValues } from "./utils/getTheValues";
import {
  uploadBytes,
  ref,
  storage,
  getDownloadURL,
} from "@/core/libs/firebase";
import { TypeRE } from "@/shared/types/realEstate";

const DashboardPage = () => {
  const { language } = useLanguageStore();
  const { user } = useAuthStore();
  const { handleNavigate } = useNavigation();
  const { handleStateModal, isModalOpen } = useModal();
  const [location, setLocation] = useState<Location | null>(null);
  const [typeRE, setTypeRE] = useState({} as TypeRE);

  const [uploadStatus, setUploadStatus] = useState<string[]>([]);
  const [fileUrls, setFileUrls] = useState<string[]>([]);

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

  const { data } = useGet({
    itemsPerPage: 10,

    queryKey: "type-realEstates",
    services: fetchTypesRE,
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

  return (
    <div>
      <button onClick={handleStateModal}> crar </button>

      <ShowModal
        title="Crear inmueble"
        isModalOpen={isModalOpen}
        setIsModalOpen={handleStateModal}
        children={
          <FormComponent
            handleOnSubmit={handleOnSubmit}
            isPending={isPendingRealEstate}
            btnText="Guardar"
            children={
              <div className="grid grid-cols-2 gap-3">
                <Input
                  text="Titulo"
                  error={errors.titleEs}
                  register={register("titleEs")}
                />
                <Input
                  text="Descripcion"
                  error={errors.descriptionEs}
                  register={register("descriptionEs")}
                />
                <Input
                  text="Precio"
                  error={errors.price}
                  register={register("price")}
                />
                <Input
                  text="Habitaciones"
                  error={errors.amountBedroom}
                  register={register("amountBedroom")}
                />
                <Input
                  text="Baños"
                  error={errors.amountBathroom}
                  register={register("amountBathroom")}
                />
                <Input
                  text="Metros cuadrados"
                  error={errors.squareMeter}
                  register={register("squareMeter")}
                />
                <Select
                  value={typeRE}
                  onChange={(val:TypeRE) => {
                    setTypeRE(val);
                  }}
                  options={data?.map((v) => ({
                    value: v.name[language],
                    id: v.id,
                  }))}
                />
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageSelection}
                />
                <div>
                  <h3>Upload Status:</h3>
                  <ul>
                    {uploadStatus.map((status, index) => (
                      <li key={index}>{status}</li>
                    ))}
                  </ul>
                </div>
              </div>
            }
            children2={<Map location={location} setLocation={setLocation} />}
          />
        }
      />
    </div>
  );
};

export default DashboardPage;
