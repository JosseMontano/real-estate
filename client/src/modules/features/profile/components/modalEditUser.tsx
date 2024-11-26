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
type ParamsType = {
  isModaEditUserOpen: boolean;
  handleShowModalEditUser: () => void;
  handleImageUpload: (url: string) => void;
  handleShowModalUpImage: () => void;
  isModalUpImageOpen: boolean;
  btnEditUserLanguage:string;
  btnSaveLanguage:string;
  username: string;
  phoneNumber: string;
  email: string;
};
export const ModalEditUser = ({
  isModaEditUserOpen,
  handleShowModalEditUser,
  handleImageUpload,
  handleShowModalUpImage,
  isModalUpImageOpen,
  btnEditUserLanguage,
  btnSaveLanguage,
  email,
  phoneNumber,
  username
}: ParamsType) => {
  const { user } = useAuthStore();

  const {
    register,
    handleOnSubmit,
    errors,
    isPending: isPendingUser,
  } = useForm({
    schema: userEditSchema,
    form: async (data) => {
      if (user?.id) {
        await editUser(user.id.toString(), data);
      }
    },
    defaultVales: user ? user : ({} as User),
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
                  text={username}
                  error={errors?.userName}
                  register={register("userName")}
                />
                <Input
                  text={phoneNumber}
                  error={errors?.cellphoneNumber}
                  register={register("cellphoneNumber")}
                />
                <Input
                  text={email}
                  error={errors?.email}
                  register={register("email")}
                />
                <ProfileImageUploader
                  onImageUpload={handleImageUpload}
                  handleShowModal={handleShowModalUpImage}
                  isModalOpen={isModalUpImageOpen}
                />
              </>
            }
          />
        }
      />
    </div>
  );
};
