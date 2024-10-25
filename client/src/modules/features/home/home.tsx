import { useForm } from "@/core/hooks/useForm";
import { questionSchema } from "./validations/question.schema";
import { addQuestionToDB } from "./api/endpoints";
import bgImage from "@/shared/assets/bg.jpg";
import { primaryColor } from "@/const/colors";
import { ArrowDown } from "@/shared/assets/icons/arrowDown";

export const HomePage = () => {
  const {} = useForm({
    schema: questionSchema,
    form: async (data) => {
      await addQuestionToDB(data);
    },
  });

  return (
    <div>
      <div
        className="w-full h-screen relative bg-cover"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="h-screen bg-black bg-opacity-50">
          {/* Header */}
          <header className="text-white">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <div className="text-2xl font-bold">Oakberry</div>
              <nav className="space-x-6">
                <a href="#">Inicio</a>
                <a href="#">Sobre nosotros</a>
                <a href="#">Propiedades</a>
                <a href="#">Agencias</a>
                <a href="#">Blog</a>
                <a href="#">Contactanos</a>
              </nav>
              <button
                className="text-white px-4 py-2 rounded"
                style={{ background: primaryColor }}
              >
                Enviar un propiedad
              </button>
            </div>
          </header>

          {/* Hero Section */}
          <section className="flex justify-center my-56">
            <div className="container mx-auto  text-center ">
              <h1 className="text-7xl font-bold text-white mb-4">
                La casa moderna hace la vida mejor
              </h1>
              <p className="text-white mb-8">
                Un pequeño río llamado Duden fluye por su lugar y lo abastece de
                la indumentaria necesaria
              </p>
              <button
                className="bg-green-500 text-white px-6 py-2 rounded"
                style={{ background: primaryColor }}
              >
                Aprender mas
              </button>
            </div>
          </section>
          {/* Property Search Form */}
          <section className="container absolute bottom-4 left-1/2 transform -translate-x-1/2 max-w-7xl mx-auto bg-white shadow-md flex">
            <div className="bg-white p-2 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full">
              <div className="flex-1">
                <label>Ingresa alguna palabra</label>
                <input
                  type="text"
                  className={`w-full border border-gray-300  rounded px-4 py-[5px] my-3 focus:outline-none focus:ring-2`}
                  placeholder="3 dormitorios"
                />
              </div>
              <div className="flex-1">
                <label>Tipo de propiedad</label>
                <select className="w-full border-gray-300 rounded px-4 py-2 my-3 ">
                  <option>Residencial</option>
                  <option>Soltero</option>
                  <option>Commercial</option>
                  <option>Casado</option>
                  <option>Viudo</option>
                </select>
              </div>
              <div className="flex-1">
                <label>Ubicación</label>
                <select className="w-full border border-gray-300 rounded px-4 py-2 my-3 ">
                  <option>Queru queru</option>
                  <option>Cala cala</option>
                  <option>Prado</option>
                  <option>Bulevar</option>
                </select>
              </div>
              <div className="flex-1">
                <label>Limites de precio</label>
                <select className="w-full border border-gray-300 rounded px-4 py-2 my-3 ">
                  <option>1000Bs</option>
                  <option>1500Bs</option>
                  <option>2000Bs</option>
                  <option>2500Bs</option>
                </select>
              </div>
            </div>
            <div className="flex end-0">
              <button
                className="text-white px-10 py-2 "
                style={{ background: primaryColor }}
              >
                Search
              </button>
            </div>
          </section>
        </div>
      </div>
      <div></div>
    </div>
  );
};
