import useNavigation from "@/core/hooks/useNavigate";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import use360photo from "@/core/store/360photo";
import { PhotoRes, RealEstate } from "@/shared/types/realEstate";
import { HeartFill } from "@/shared/assets/icons/heartFill";
import { favsRESchema } from "../../validations/favRE.shema";
import { addFavRE } from "../../api/endpoints";
import { useForm } from "@/core/hooks/useForm";
import useAuthStore from "@/core/store/auth";
import { useLanguageStore } from "@/core/store/language";
import { deleteFavRe } from "@/features/profile/api/endpoints";
import { useMutation } from "@tanstack/react-query";


type ParamsType = {
  img: PhotoRes[];
  index: number;
  isFavorite: boolean;
  item: RealEstate;
};
export const Photo = ({ img, index, isFavorite, item }: ParamsType) => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 3000 + index * 600 }),
  ]);
  const { handleNavigate } = useNavigation();
  const { loadUrl } = use360photo();
  const { user, addFavorite, removeFavorite } = useAuthStore();
  const { language } = useLanguageStore();
  const { handleOnSubmit, setSuccessMsg, setErrorMsg } = useForm({
    schema: favsRESchema,
    form: async (data) => {
      data.user_id = user.id;
      data.real_estate_id = img[0].real_estate_id;
      const res = await addFavRE(data);
      if (res.status == 200 || res.status == 201) {
        setSuccessMsg(res.message[language]);
        addFavorite(res.val);
      } else {
        setErrorMsg(res.message[language]);
      }
    },
  });

  const { mutate: deleteFav } = useMutation({
    mutationFn: ()=>deleteFavRe(item.id ?? 0, user.id ?? 0),
    onSuccess: () => {
      removeFavorite(item.id ?? 0);
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
           
              >
                {user.id != undefined && !isFavorite && (
                  <HeartFill size={"22"} className="text-gray-200"  onClick={handleOnSubmit}/>
                )}
                {user.id != undefined && isFavorite && (
                  <HeartFill
                    size={"22"}
                    className="text-red-500"
                    onClick={deleteFav}
                  />
                )}
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
