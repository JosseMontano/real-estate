import { primaryColor } from "@/core/constants/colors";

type Props = {
  isPending: boolean;
  text: string;
  disabled?: boolean;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  smallBtn?: boolean;
};

const Btn = ({
  isPending,
  text,
  className,
  onClick,
  disabled,
  smallBtn = false,
}: Props) => {
  //guardar... - gurdando  //iniciar iniciando... //publicar publicando...
  const textPending = text.slice(0, -1) + "ndo...";
  return (
    <button
      type="submit"
      disabled={isPending || disabled}
      style={{ background: primaryColor }}
      className={` text-white py-2 rounded-2xl hover:opacity-90 border-none focus:outline-none ${
        isPending || disabled
          ? "opacity-50 cursor-not-allowed"
          : "hover:opacity-90"
      }
        ${smallBtn ? "py-[2px] px-[5px] w-auto text-sm" : "w-full"}

       ${className}`}
      onClick={onClick}
    >
      {isPending ? textPending : text}
    </button>
  );
};

export default Btn;
