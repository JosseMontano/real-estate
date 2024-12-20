import { ArrowLeft } from "@/shared/assets/icons/arrowLeft";
import useNavigation from "../hooks/useNavigate";
import { Routes } from "../../../App";

type ParamsType = {
    location:Routes
}
export const ComeBack = ({location}:ParamsType) => {
    const {handleNavigate} = useNavigation()
    return (
        <div onClick={()=>handleNavigate(location)} className="md:hidden absolute top-2 left-2 bg-primary rounded-full w-6 h-6 flex items-center justify-center text-white">
        <ArrowLeft size={18} />
      </div>
    );
}