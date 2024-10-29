import { primaryColor } from "@/const/colors";
import WrenchIcon from "../assets/icons/wrench";
import { useModal } from "@/core/hooks/useModal";
import { ShowModal } from "@/core/components/form/modal";
import { useLanguageStore } from "@/core/store/language";
import Select from "@/core/components/form/select";

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

              <Select
                value={language}
                onChange={handleLanguageChange}
                options={[
                  { value: "es", label: texts.language1Config },
                  { value: "en", label: texts.language2Config },
                  { value: "pt", label: texts.language3Config },
                ]}
              />
            </div>
          </div>
        }
      />
    </>
  );
};
