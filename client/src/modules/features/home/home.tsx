import bgImage from "@/shared/assets/bg.jpg";
import { Header } from "./components/header";
import { TitleCenter } from "./components/titleCenter";

import { SectionRealStates } from "./components/sectionRealEstates";
import { Footer } from "./components/footer";
import { Questions } from "./components/question";
import { useQuery } from "@tanstack/react-query";
import { fetchRealEstates } from "./api/endpoints";
import { SearchPropierties } from "./components/searchPropierties";

export const HomePage = () => {
  const {
    isLoading,
    data: realEstates,
    isError,
    error,
  } = useQuery({
    queryKey: ["realEstates"],
    queryFn: () => fetchRealEstates(),
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
      <SectionRealStates realEstates={realEstates ?? []} />
      {isLoading && <p>Loading...</p>}

      <Questions />
      <Footer />
    </div>
  );
};
