import Btn from "@/core/components/form/button";

type ParamsType = {};
export const TitleCenter = ({}: ParamsType) => {
  return (
    <section className="flex justify-center absolute top-0 left-0 h-screen w-full items-center">
      <div className="container text-center bg- w-full max-w-lg px-4 md:w-[500px] flex flex-col gap-5 items-center">
        <h1 className="text-4xl md:text-7xl font-bold text-white leading-tight">
          La casa moderna hace la vida mejor
        </h1>
        <p className="text-white text-sm md:text-base">
          Un pequeño río llamado Duden fluye por su lugar y lo abastece de la
          indumentaria necesaria
        </p>
        <div className="max-w-max flex items-center">
          <Btn
            text="Aprender mas"
            isPending={false}
            className="w-auto px-4 py-2 md:px-6 md:py-3"
          />
        </div>
      </div>
    </section>
  );
};
