import bgImage from "@/shared/assets/bg.jpg";
import { Header } from "./components/header";
import { TitleCenter } from "./components/titleCenter";
import { SectionRealStates } from "./components/sectionRealEstates";
import { Footer } from "./components/footer";
import { Questions } from "./components/question";
import { fetchRealEstates, fetchZones } from "./api/endpoints";
import useGet from "@/core/hooks/useGet";
import { useEffect } from "react";
import { SearchPropierties } from "./components/searchPropierties";
import { useLanguageStore } from "@/core/store/language";

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

  const { data: zones} = useGet({
    services: fetchZones,
    queryKey: ["zones"],
    itemsPerPage: 1000,
  });

  //Home translate
  const { texts } = useLanguageStore();
  const links = [
    texts.languageHeader1,
    texts.languageHeader2,
    texts.languageHeader3,
    texts.languageHeader4,
  ];
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
          tipeProperty={texts.propertyTypeLabel}
          ubication={texts.locationLabel}
          limitPrice={texts.priceRangeLabel}
          selectProperty={texts.propertyTypeInput}
          selectUbi={texts.locationInput}
          selecPrice={texts.priceRangeInput}
          zones={zones ?? []}
        />
      </div>
      <SectionRealStates
        realEstates={realEstates ?? []}
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
