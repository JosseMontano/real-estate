import bgImage from "@/shared/assets/bg.jpg";
import { Header } from "./components/header";
import { TitleCenter } from "./components/titleCenter";
import { SectionRealStates } from "./components/sectionRealEstates";
import { Footer } from "./components/footer";
import { Questions } from "./components/question";
import { fetchZones, filterRE } from "./api/endpoints";
import useGet from "@/core/hooks/useGet";
import { useEffect, useState } from "react";
import { SearchPropierties } from "./components/searchPropierties";
import { useLanguageStore } from "@/core/store/language";
import { fetchRealEstates } from "@/shared/api/endpoints";
import { fetchTypeRe } from "../dashTypeRe/api/endpoints";
import { RealEstate } from "@/shared/types/realEstate";
type Options = "price" | "type" | "zone";

export type OptionsType = {
  id: number;
  name: string;
  type: Options;
};

export type Field = {
  label: string;
  type: "text" | "select";
  placeholder?: string;
  options?: OptionsType[];
  readonly?: boolean;
};

export const HomePage = () => {
  const {
    data: realEstates,
    isLoading,
    firstElementRef,
    amountOfPages,
    handlePagination,
    currentPage,
  } = useGet({
    services: fetchRealEstates,
    queryKey: ["realEstates"],
    itemsPerPage: 3,
  });

  useEffect(() => {
    return () => {
      // get by class
      const sceneEl = document.querySelector(".a-fullscreen");
      if (sceneEl) sceneEl.remove();
    };
  }, []);

  const { data: zones } = useGet({
    services: fetchZones,
    queryKey: ["zones"],
    itemsPerPage: 1000,
  });

  const { data: typeRe } = useGet({
    services: fetchTypeRe,
    queryKey: ["typeRe"],
    itemsPerPage: 3,
  });
  //Home translate
  const { texts } = useLanguageStore();
  const links = [
    texts.languageHeader1,
    texts.languageHeader2,
    texts.languageHeader3,
    texts.languageHeader4,
  ];

  const { language } = useLanguageStore();
  const zonesOptions: OptionsType[] = zones.map((zone) => {
    return {
      id: zone.id,
      name: zone.name,
      type: "zone",
    };
  });
  const typeReOptions: OptionsType[] = typeRe.map((type) => {
    return {
      id: type.id,
      name: type.name[language],
      type: "type",
    };
  });

  const fields: Field[] = [
    {
      label: texts.propertyTypeLabel,
      type: "select",
      options: [
        { id: 0, name: texts.propertyTypeInput, type: "type" },
        ...typeReOptions,
      ],
    },
    {
      label: texts.locationLabel,
      type: "select",
      options: [
        { id: 0, name: texts.locationInput, type: "zone" },
        ...zonesOptions,
      ],
    },
    {
      label: texts.priceRangeLabel,
      type: "select",
      options: [
        {
          id: 0,
          name: texts.priceRangeInput,
          type: "price",
        },
        {
          id: 1,
          name: "0-500",
          type: "price",
        },
        {
          id: 2,
          name: "500-1000",
          type: "price",
        },
        {
          id: 3,
          name: "1000-1500",
          type: "price",
        },
        {
          id: 4,
          name: "1500-2000",
          type: "price",
        },
        {
          id: 5,
          name: "2000-2500",
          type: "price",
        },
        {
          id: 6,
          name: "superiores",
          type: "price",
        },
      ],
    },
  ];

  const [selectedValues, setSelectedValues] = useState<OptionsType[]>(
    Array(fields.length).fill("")
  );

  const handleSelectChange = (value: OptionsType, index: number) => {
    const updatedValues = [...selectedValues];
    updatedValues[index] = value;
    setSelectedValues(updatedValues);
  };

  const [searchRE, setSearchRE] = useState([] as RealEstate[]);

  return (
    <>
      <img
        src={bgImage}
        alt="bg"
        className="absolute top-0 w-full h-screen object-cover"
      />
      <Header links={links} />
      <div className="h-screen relative top-0 bg-black bg-opacity-60 ">
        <TitleCenter
          titleCenter={texts.centralTitle}
          subtitleCenter={texts.centralSubtitle}
          seeMoreProperties={texts.centralButton}
        />
        <SearchPropierties
          fields={fields}
          handleSelectChange={handleSelectChange}
          handleSearch={async () => {
            const res = await filterRE(selectedValues);
            setSearchRE(res.val);
          }}
        />
      </div>
      <SectionRealStates
        realEstates={searchRE.length > 0 ? searchRE : realEstates ?? []}
        firstElementRef={firstElementRef}
        amountOfPages={amountOfPages}
        handlePagination={handlePagination}
        currentPage={currentPage}
        infoTextLanguage={texts.infoButton}
        placeTextLanguage={texts.placesButton}
        seeMoreBtn={texts.viewMoreButton}
      />

      {isLoading && <p>Loading...</p>}

      <Questions
        ask={texts.ask}
        btn={texts.saveButton}
        description={texts.questionSubtitle}
        placeHolder={texts.questionPlaceholder}
        question={texts.question}
      />
      <Footer textFooter={texts.copyright} />
    </>
  );
};
