import { useLocation, useNavigate } from "react-router-dom";
import { Routes } from "../../../App";
import useGeneralStore from "../store/general";

const useNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation(); 
  const {setLastPageVisited} = useGeneralStore()

  const handleNavigate = (path: Routes) => {
    navigate(path);
    setLastPageVisited(location.pathname as Routes);
  };

  return {
    handleNavigate,
    location: location.pathname as Routes,
  };
};

export default useNavigation;
