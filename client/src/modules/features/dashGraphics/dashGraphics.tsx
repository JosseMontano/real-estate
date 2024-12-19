import useNavigation from "@/core/hooks/useNavigate";
import { useEffect } from "react";

type ParamsType = {
}
export const DashGraphics = ({}:ParamsType) => {
    const {handleNavigate} = useNavigation()
    
     useEffect(() => {
        handleNavigate('/dashboard/realEstates')
    }, [])
    return (
        <div>
            Income! Graphics
        </div>
    );
}