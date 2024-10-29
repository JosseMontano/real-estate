import { primaryColor } from "@/const/colors";

type Props = {
  isPending: boolean;
  text: string;
  className?:string;
};
const Btn = ({ isPending, text, className}: Props) => {
  //guardar... - gurdando  //iniciar iniciando... //publicar publicando...
  const textPending = text.slice(0, -1) + "ndo...";
  return (
    <button
      type="submit"
      disabled={isPending}
      style={{ background: primaryColor }}
      className={`w-full text-white py-2 rounded-lg hover:opacity-90 border-none focus:outline-none ${className}`}
    >
      {isPending ? textPending : text}
    </button>
  );
};

export default Btn;
