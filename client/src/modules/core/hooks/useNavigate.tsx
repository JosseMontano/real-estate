import { useLocation, useNavigate } from "react-router-dom";
import { Routes } from "../../../App";

const useNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation(); 

  const handleNavigate = (path: Routes) => {
    navigate(path);
  };

  return {
    handleNavigate,
    location: location.pathname as Routes,
  };
};

export default useNavigation;
