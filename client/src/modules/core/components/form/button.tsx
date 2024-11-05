import { primaryColor } from "@/const/colors";

type Props = {
  isPending: boolean;
  text: string;
  disabled?: boolean;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

const Btn = ({ isPending, text, className, onClick, disabled }: Props) => {
  //guardar... - gurdando  //iniciar iniciando... //publicar publicando...
  const textPending = text.slice(0, -1) + "ndo...";

  return (
    <button
      type="submit"
      disabled={isPending || disabled}
      style={{ background: primaryColor }}
      className={`w-full text-white py-2 rounded-lg hover:opacity-90 border-none focus:outline-none ${
        isPending || disabled
          ? "opacity-50 cursor-not-allowed"
          : "hover:opacity-90"
      } ${className}`}
      onClick={onClick}
    >
      {isPending ? textPending : text}
    </button>
  );
};

export default Btn;
