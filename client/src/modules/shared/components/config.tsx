import { primaryColor } from "@/const/colors";
import WrenchIcon from "../assets/icons/wrench";
import { useModal } from "@/core/hooks/useModal";
import { ShowModal } from "@/core/components/form/modal";
import { useLanguageStore } from "@/core/store/language";

export const Config = () => {
  const { texts, language, setLanguage } = useLanguageStore();
  const { handleStateModal, isModalOpen } = useModal();

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setLanguage(event.target.value as "en" | "es" | "pt");
  };

  return (
    <>
      <div
        className="fixed bottom-2 right-2 p-3 rounded-full cursor-pointer"
        onClick={handleStateModal}
        style={{
          background: primaryColor,
        }}
      >
        <WrenchIcon size={25} className="text-white" />
      </div>
      <ShowModal
        isModalOpen={isModalOpen}
        setIsModalOpen={handleStateModal}
        title={texts.titleConfig}
        children={
          <div className="w-[300px]">
            <div className="flex gap-2 items-center">
              <h3>{texts.languageConfig}</h3>
              <select
                value={language}
                onChange={handleLanguageChange}
                className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="es" className="text-gray-900">
                  {texts.language1Config}
                </option>
                <option value="en" className="text-gray-900">
                  {texts.language2Config}
                </option>
                <option value="pt" className="text-gray-900">
                  {texts.language3Config}
                </option>
              </select>
            </div>
          </div>
        }
      />
    </>
  );
};
