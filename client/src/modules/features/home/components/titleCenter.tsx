import Btn from "@/core/components/form/button";
import { Link } from "react-scroll";

type ParamsType = {
  titleCenter: string;
  subtitleCenter: string;
  seeMoreProperties: string;
};
export const TitleCenter = ({
  titleCenter,
  subtitleCenter,
  seeMoreProperties,
}: ParamsType) => {
  return (
    <section className="flex justify-center absolute top-0 left-0 h-screen w-full items-center">
      <div className="container text-center bg- w-full max-w-lg px-4 md:w-[500px] flex flex-col gap-5 items-center">
        <h1 className="text-5xl sm:leading-normal sm:text-6xl md:text-7xl font-[800] text-white ">
          {titleCenter}
        </h1>
        <p className="text-white text-base w-[350px]">{subtitleCenter}</p>
        <div className="max-w-max flex items-center ">
          <Link to="realEstates" smooth={true} duration={500}>
            <Btn
              text={seeMoreProperties}
              isPending={false}
              className="w-auto px-4 py-2 md:px-6 md:py-3 shake"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};
