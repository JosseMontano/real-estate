import useNavigation from "@/core/hooks/useNavigate";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import use360photo from "@/core/store/360photo";
import { PhotoRes } from "@/shared/types/realEstate";
import { HeartFill } from "@/shared/assets/icons/heartFill";
import { favsRESchema } from "../../validations/favRE.shema";
import { addFavRE } from "../../api/endpoints";
import { useForm } from "@/core/hooks/useForm";
import useAuthStore from "@/core/store/auth";
import { useLanguageStore } from "@/core/store/language";

type ParamsType = {
  img: PhotoRes[];
  index:number
};
export const Photo = ({ img, index }: ParamsType) => {
  const [emblaRef] = useEmblaCarousel({ loop: true },   [Autoplay({ delay: 3000 + (index*600) })] );
  const { handleNavigate } = useNavigation();
  const { loadUrl } = use360photo();
  const { user } = useAuthStore();
  const { language } = useLanguageStore();
  const { handleOnSubmit, setSuccessMsg, setErrorMsg } = useForm({
    schema: favsRESchema,
    form: async (data) => {
      data.user_id = user.id;
      data.real_estate_id = img[0].real_estate_id;
      const res = await addFavRE(data);
      if (res.status == 200 || res.status == 201) {
        setSuccessMsg(res.message[language]);
      } else {
        setErrorMsg(res.message[language]);
      }
    },
  });

  return (
    <div className=" flex justify-center w-full md:w-1/2">
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          {img.map((v) => (
            <div
              key={v.id}
              className="embla__slide flex justify-center relative "
            >
              <div
                className="absolute right-6 top-2 cursor-pointer"
                onClick={handleOnSubmit}
              >
                <HeartFill size={"22"} className="text-gray-200" />
              </div>
              <img
                src={v.image}
                alt="Imagen"
                className="w-[650px] h-[250px] object-cover rounded-lg shadow-lg"
                onClick={() => {
                  loadUrl(v.image);
                  // Step 2: Convert the encrypted data to Base64 directly
                  handleNavigate("/img360");
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
