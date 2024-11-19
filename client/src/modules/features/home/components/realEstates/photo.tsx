import useNavigation from "@/core/hooks/useNavigate";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import use360photo from "@/core/store/360photo";
import { PhotoRes } from "@/shared/types/realEstate";

type ParamsType = {
  img: PhotoRes[];
};
export const Photo = ({ img }: ParamsType) => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()]);
  const {handleNavigate}= useNavigation()
  const {loadUrl} = use360photo()

  return (
    <div className=" flex justify-center w-full md:w-1/2">
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          {img.map((v) => (
            <div className="embla__slide flex justify-center">
              <img
                src={v.image}
                alt="Imagen"
                className="w-[650px] h-[250px] object-cover rounded-lg shadow-lg"
                onClick={()=>{
                  loadUrl(v.image)
                  // Step 2: Convert the encrypted data to Base64 directly
                  handleNavigate("/img360")
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
