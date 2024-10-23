type Props = {
  isPending: boolean;
  text: string;
};
const Btn = ({ isPending, text }: Props) => {
  //guardar... - gurdando  //iniciar iniciando... //publicar publicando...
  const textPending = text.slice(0, -1) + "ndo...";
  return (
    <button type="submit" disabled={isPending}>
      {isPending ? textPending : text}
    </button>
  );
};

export default Btn;
