import bgImage from "@/shared/assets/bg.jpg";
import { Header } from "./components/header";
import { TitleCenter } from "./components/titleCenter";
import { SectionRealStates } from "./components/sectionRealEstates";
import { Footer } from "./components/footer";
import { Questions } from "./components/question";
import { fetchRealEstates } from "./api/endpoints";
import useGet from "@/core/hooks/useGet";
import { useEffect, useState } from "react";
import { useModal } from "@/core/hooks/useModal";
import Comments from "./components/comments";
import { RealEstate } from "@/shared/types/realEstate";
import { SearchPropierties } from "./components/searchPropierties";

export const HomePage = () => {
  const [currentRealEstate, setCurrentRealEstate] = useState({} as RealEstate);
  const {
    data: realEstates,
    isLoading,
    firstElementRef,
    amountOfPages,
    handlePagination,
    currentPage,
  } = useGet({
    services: fetchRealEstates,
    queryKey: "realEstates",
    itemsPerPage: 3,
  });

  console.log(realEstates);

  const { handleStateModal, isModalOpen } = useModal();

  const handleOpenCreateComment=(v:RealEstate)=>{
    handleStateModal()
    setCurrentRealEstate(v)
  }

  useEffect(() => {
    return () => {
      // get by class
      const sceneEl = document.querySelector(".a-fullscreen");
      if (sceneEl) sceneEl.remove();
    };
  }, []);
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
        handleStateModal={handleOpenCreateComment}
      />

      <Comments currentRealEstate={currentRealEstate} isModalOpen={isModalOpen} setIsModalOpen={handleStateModal} />

      {isLoading && <p>Loading...</p>}

      <Questions />
      <Footer />
    </div>
  );
};
