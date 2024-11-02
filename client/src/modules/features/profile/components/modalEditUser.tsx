import Btn from "@/core/components/form/button";
import FormComponent from "@/core/components/form/form";
import { Input } from "@/core/components/form/input";
import { useForm } from "@/core/hooks/useForm";
import useAuthStore from "@/core/store/auth";
import { User } from "@/core/types/user";
import { userEditSchema } from "../validations/userEdit.schema";
import {editUser } from "../api/endpoints";
import { ShowModal } from "@/core/components/form/modal";
type ParamsType = {
  isModalOpen: boolean;
  handleShowModal: () => void;
};
export const ModalEditUser = ({
  isModalOpen,
  handleShowModal,
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
        await editUser(user.id, data);
      }
    },
    defaultVales:user? user : {} as User
  });

  return (
    <div className="">
      <Btn
        isPending={false}
        text="Editar usuario"
        className="max-w-max p-2"
        onClick={handleShowModal}
      />
 
        <ShowModal
          setIsModalOpen={handleShowModal}
          isModalOpen={isModalOpen}
          title="Editar usuario"
          children={
            <FormComponent
              handleOnSubmit={handleOnSubmit}
              isPending={isPendingUser}
              btnText="Guardar"
              children={
                <>
                  <Input
                    text="Nombre de usuario"
                    error={errors?.userName}
                    register={register("userName")}
                  />
                  <Input
                    text="Numero de celular"
                    error={errors?.cellphoneNumber}
                    register={register("cellphoneNumber")}
                  />
                  <Input
                    text="Correo"
                    error={errors?.email}
                    register={register("email")}
                  />
                </>
              }
            />
          }
        />
    
    </div>
  );
};
