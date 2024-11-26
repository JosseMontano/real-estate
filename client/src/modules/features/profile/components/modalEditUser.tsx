import Btn from "@/core/components/form/button";
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
  const [file, setFile] = useState<File>({} as File);
  const [urlImage, setUrlImage] = useState("");
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
        try {
          const storageRef = ref(storage, `profile-images/${file.name}`);
          await uploadBytes(storageRef, file);
          url = await getDownloadURL(storageRef);
          setUrlImage(url);
        } catch (error) {
          console.error("Error uploading image:", error);
        }
        data.photo = url;
        const res = await editUser(user.email, data);
        if (res.status === 200) {
          setSuccessMsg(res.message);
          login(res.val as User);
        } else {
          setErrorMsg(res.message);
        }
      }
    },
    defaultVales: user ? {...user, password:""} : ({} as User),
  });

  return (
    <div className="">
      <Btn
        isPending={false}
        text={btnEditUserLanguage}
        className="max-w-max px-2"
        onClick={handleShowModalEditUser}
      />

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
                />
                <Input
                  text={texts.password}
                  error={errors?.password}
                  register={register("password")}
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
