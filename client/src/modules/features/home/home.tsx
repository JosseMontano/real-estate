
import bgImage from "@/shared/assets/bg.jpg";
import { Header } from "./components/header";
import { TitleCenter } from "./components/titleCenter";
import { SearchPropierties } from "./components/searchForm";

import { SectionRealStates } from "./components/sectionRealEstates";
import { Footer } from "./components/footer";
import { Questions } from "./components/question";

export const HomePage = () => {
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
      <SectionRealStates />

        <Questions />
        <Footer />
     
    </div>
  );
};
