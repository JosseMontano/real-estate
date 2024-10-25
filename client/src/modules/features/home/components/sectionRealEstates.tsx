import img1 from "@/shared/assets/BR.jpg";
import img2 from "@/shared/assets/BR2.jpg";
import img3 from "@/shared/assets/BR3.jpg";


export const SectionRealStates = () => {
  const data = [
    {
      image: img1,
      subTitle: "Se lo ponemos fácil a inquilinos y propietarios.",
      text: "Ya sea para vender su vivienda actual, obtener financiación o comprar una nueva, nosotros se lo ponemos fácil y eficaz. ¿Y lo mejor? Ahorrará mucho dinero y tiempo con nuestros servicios.",
    },
    {
      image: img2,
      subTitle: "Se lo ponemos fácil a inquilinos y propietarios.",
      text: "Ya sea para vender su vivienda actual, obtener financiación o comprar una nueva, nosotros se lo ponemos fácil y eficaz. ¿Y lo mejor? Ahorrará mucho dinero y tiempo con nuestros servicios.",
    },
    {
      image: img3,
      subTitle: "Se lo ponemos fácil a inquilinos y propietarios.",
      text: "Ya sea para vender su vivienda actual, obtener financiación o comprar una nueva, nosotros se lo ponemos fácil y eficaz. ¿Y lo mejor? Ahorrará mucho dinero y tiempo con nuestros servicios.",
    },
  ];

  return (
    <div className="space-y-12">
      {data.map((item, index) => (
        <div
          key={index}
          className={`flex flex-col md:flex-row gap-8 items-center ${
            index % 2 === 1 ? "md:flex-row-reverse" : ""
          }`}
        >
          <div className="flex justify-center w-full md:w-1/2">
            <img
              src={item.image}
              alt="Imagen"
              className="w-full max-w-xs md:max-w-md lg:max-w-lg h-auto rounded-lg shadow-lg"
            />
          </div>
          <div
            className={`flex flex-col ${
              index % 2 === 1 ? "items-end" : "items-start"
            } text-center w-full md:w-1/2`}
          >
            <div className="flex space-x-4 bg-gray-100 p-2 rounded-full">
              <button className="px-4 py-2 text-sm font-medium text-purple-700 bg-white rounded-full shadow-sm">
                Para los inquilinos
              </button>
              <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:bg-white rounded-full">
                Para los propietarios
              </button>
            </div>
            <h1 className="mt-6 text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 max-w-xs md:max-w-md lg:max-w-lg">
              {item.subTitle}
            </h1>

            <p className="mt-4 text-base md:text-lg lg:text-xl text-gray-600 max-w-xs md:max-w-md lg:max-w-lg text-justify">
              {item.text}
            </p>
            <button className="mt-6 bg-purple-600 text-white py-2 px-6 rounded-full shadow-md hover:bg-purple-700">
              Ver más
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};