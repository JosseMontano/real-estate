import { primaryColor } from "@/const/colors";

type ParamsType = {};
export const TitleCenter = ({}: ParamsType) => {
  return (
    <section className="flex justify-center my-56">
      <div className="container mx-auto  text-center ">
        <h1 className="text-7xl font-bold text-white mb-4">
          La casa moderna hace la vida mejor
        </h1>
        <p className="text-white mb-8">
          Un pequeño río llamado Duden fluye por su lugar y lo abastece de la
          indumentaria necesaria
        </p>
        <button
          className="bg-green-500 text-white px-6 py-2 rounded"
          style={{ background: primaryColor }}
        >
          Aprender mas
        </button>
      </div>
    </section>
  );
};
