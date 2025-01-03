import { primaryColor } from "@/const/colors";

type ParamsType = {};
export const TitleCenter = ({}: ParamsType) => {
  return (
    <section className="flex justify-center absolute top-0 left-0 h-screen w-full items-center">
      <div className="container text-center bg- w-[500px] flex flex-col gap-5">
        <h1 className="text-7xl font-bold text-white ">
          La casa moderna hace la vida mejor
        </h1>
        <p className="text-white ">
          Un pequeño río llamado Duden fluye por su lugar y lo abastece de la
          indumentaria necesaria
        </p>
      <div>
      <button
          className="bg-green-500 text-white px-6 py-2 rounded"
          style={{ background: primaryColor }}
        >
          Aprender mas
        </button>
      </div>
      </div>
    </section>
  );
};
