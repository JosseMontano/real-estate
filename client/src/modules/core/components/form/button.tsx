import { primaryColor } from "@/const/colors";

type Props = {
  isPending: boolean;
  text: string;
  className?: string;
  onClick?:React.MouseEventHandler<HTMLButtonElement> | undefined
};
const Btn = ({ isPending, text, className, onClick }: Props) => {
  //guardar... - gurdando  //iniciar iniciando... //publicar publicando...
  const textPending = text.slice(0, -1) + "ndo...";
  return (
    <button
      type="submit"
      disabled={isPending}
      style={{ background: primaryColor }}
      className={`w-full text-white py-2 rounded hover:opacity-90 focus:outline-none ${className}`}
      onClick={onClick}
    >
      {isPending ? textPending : text}
    </button>
  );
};

export default Btn;
