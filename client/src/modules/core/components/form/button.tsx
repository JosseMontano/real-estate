import { primaryColor } from "@/const/colors";

type Props = {
  isPending: boolean;
  text: string;
  disabled?: boolean;
};

const Btn = ({ isPending, text, disabled }: Props) => {
  //guardar... - gurdando  //iniciar iniciando... //publicar publicando...
  const textPending = text.slice(0, -1) + "ndo...";

  return (
    <button
      type="submit"
      disabled={isPending || disabled}
      style={{ background: primaryColor }}
      className={`w-full text-white py-2 rounded focus:outline-none focus:ring-2 ${
        isPending || disabled
          ? "opacity-50 cursor-not-allowed"
          : "hover:opacity-90"
      }`}
    >
      {isPending ? textPending : text}
    </button>
  );
};

export default Btn;