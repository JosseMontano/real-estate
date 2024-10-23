import Btn from "./button";

type Props = {
  children: JSX.Element;
  isPending: boolean;
  handleOnSubmit: () => void;
  btnText: string;
};
const FormComponent = ({ children, handleOnSubmit, isPending, btnText }: Props) => {
  return (
    <form onSubmit={handleOnSubmit}>
      {children}

      <Btn isPending={isPending} text={btnText} />
    </form>
  );
};

export default FormComponent;
