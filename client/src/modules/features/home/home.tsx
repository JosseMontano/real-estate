import bgImage from "@/shared/assets/bg.jpg";
import { Header } from "./components/header";
import { TitleCenter } from "./components/titleCenter";
import { SearchPropierties } from "./components/searchForm";

import { SectionRealStates } from "./components/sectionRealEstates";
import { Footer } from "./components/footer";
import { Questions } from "./components/question";
import { fetchRealEstates } from "./api/endpoints";
import useGet from "@/core/hooks/useGet";

export const HomePage = () => {
  const {
    data: realEstates,
    isLoading,
    firstElementRef,
    amountOfPages,
    handlePagination,
    currentPage
  } = useGet({
    services: fetchRealEstates,
    queryKey: "realEstates",
    itemsPerPage: 3,
  });

  return (
    <div>
      <div
        className="w-full h-screen bg-cover relative"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="h-screen bg-black bg-opacity-50 ">
          <Header />
          <TitleCenter />
          <SearchPropierties />
        </div>
      </div>
      <SectionRealStates
        realEstates={realEstates ?? []}
        firstElementRef={firstElementRef}
        amountOfPages={amountOfPages}
        handlePagination={handlePagination}
      currentPage={currentPage}
      />
      {isLoading && <p>Loading...</p>}

      <Questions />
      <Footer />
    </div>
  );
};
