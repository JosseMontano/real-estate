import useNavigation from "@/core/hooks/useNavigate";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";

type ParamsType = {
  img: string[];
};
export const Photo = ({ img }: ParamsType) => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()]);
  const {handleNavigate}= useNavigation()
  return (
    <div className=" flex justify-center w-full md:w-1/2">
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          {img.map((v) => (
            <div className="embla__slide flex justify-center">
              <img
                src={v}
                alt="Imagen"
                className="w-full max-w-xs md:max-w-md lg:max-w-lg h-auto rounded-lg shadow-lg"
                onClick={()=>handleNavigate("/img360/"+btoa(v))}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
