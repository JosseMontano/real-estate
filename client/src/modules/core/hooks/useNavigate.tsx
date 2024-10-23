import { useNavigate } from "react-router-dom";
import { Routes } from "../../../App";

const useNavigation = () => {
  const navigate = useNavigate();

  const handleNavigate = (path: Routes) => {
    navigate(path);
  };

  return {
    handleNavigate,
  };
};

export default useNavigation;
