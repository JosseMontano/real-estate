import { primaryColor } from "@/core/constants/colors";
import WrenchIcon from "../assets/icons/wrench";
import { useModal } from "@/core/hooks/useModal";
import { ShowModal } from "@/core/components/form/modal";
import { useLanguageStore } from "@/core/store/language";
import Select from "@/core/components/form/select";

export const Config = () => {
  const { texts, language, setLanguage } = useLanguageStore();
  const { handleStateModal, isModalOpen } = useModal();

  const options = [
    {
      id: "es",
      name: { es: "Español", en: "Spanish", pt: "Espanhol" },
    },
    {
      id: "en",
      name: { es: "Inglés", en: "English", pt: "Inglês" },
    },
    {
      id: "pt",
      name: { es: "Portugués", en: "Portuguese", pt: "Português" },
    },
  ];

  return (
    <>
      <div
        className="fixed bottom-2 right-2 p-3 rounded-full cursor-pointer z-50"
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

              <Select
                value={language}
                onChange={(val) => {
                  //@ts-ignore
                  setLanguage(val.id);
                }}
                options={options}
              />
            </div>
          </div>
        }
      />
    </>
  );
};
