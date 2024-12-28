import FormComponent from "@/core/components/form/form";
import { Input } from "@/core/components/form/input";
import { useForm } from "@/core/hooks/useForm";
import useAuthStore from "@/core/store/auth";
import { User } from "@/core/types/user";
import { userEditSchema } from "../validations/userEdit.schema";
import { editUser } from "../api/endpoints";
import { ShowModal } from "@/core/components/form/modal";
import { ProfileImageUploader } from "./changeImagePerfil";
import { useLanguageStore } from "@/core/store/language";
import { useState } from "react";
import {
  storage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "@/core/libs/firebase";

type ParamsType = {
  isModaEditUserOpen: boolean;
  handleShowModalEditUser: () => void;
  btnEditUserLanguage: string;
  btnSaveLanguage: string;
};
export const ModalEditUser = ({
  isModaEditUserOpen,
  handleShowModalEditUser,
  btnEditUserLanguage,
  btnSaveLanguage,
}: ParamsType) => {
  const { user, login } = useAuthStore();
  const { texts } = useLanguageStore();
  const [file, setFile] = useState<File | null>(null);
  const [urlImage, setUrlImage] = useState("");
  const { language } = useLanguageStore();
  const {
    register,
    handleOnSubmit,
    errors,
    isPending: isPendingUser,
    setErrorMsg,
    setSuccessMsg,
  } = useForm({
    schema: userEditSchema,
    form: async (data) => {
      if (user?.id) {
        let url = "";

        if (file) {
          const storageRef = ref(storage, `profile-images/${file.name}`);
          await uploadBytes(storageRef, file);
          url = await getDownloadURL(storageRef);
          setUrlImage(url);
        }

        data.photo = url;
        //@ts-ignore
        const res = await editUser(user.email, data);
        if (res.status === 200) {
          setTimeout(() => {
            setSuccessMsg(res.message[language]);
          }, 500);
          login(res.val as User);
          handleShowModalEditUser()
        } else {
          setErrorMsg(res.message[language]);
        }
      }
    },
    defaultVales: user ? { ...user } : ({} as User),
  });

  return (
    <div className="">
      <ShowModal
        setIsModalOpen={handleShowModalEditUser}
        isModalOpen={isModaEditUserOpen}
        title={btnEditUserLanguage}
        children={
          <FormComponent
            handleOnSubmit={handleOnSubmit}
            isPending={isPendingUser}
            btnText={btnSaveLanguage}
            children={
              <>
                <Input
                  text={texts.username}
                  error={errors?.username}
                  register={register("username")}
                />
                <Input
                  text={texts.phoneNumber}
                  error={errors?.cellphone}
                  register={register("cellphone")}
                />
                <Input
                  text={texts.email}
                  error={errors?.email}
                  register={register("email")}
                  disabled={true}
                />
                <ProfileImageUploader
                  file={file}
                  setFile={setFile}
                  imgUrl={urlImage}
                  oldPhoto={user?.photo ?? ""}
                />
              </>
            }
          />
        }
      />
    </div>
  );
};
