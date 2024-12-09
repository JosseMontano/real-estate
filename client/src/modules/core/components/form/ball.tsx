import { primaryColor, secondaryColor } from "@/core/constants/colors";

type Props = {
  currentVisible: number;
  value: number;
  setCurrentVisible?: (value: number) => void;
};
const Ball = ({ currentVisible, value, setCurrentVisible }: Props) => {
  return (
    <span
      className="w-[10px] h-[10px] rounded-full cursor-pointer"
      style={{
        background: currentVisible == value ? primaryColor : "#365501",
      }}
      onClick={() => setCurrentVisible && setCurrentVisible(value)}
    ></span>
  );
};

export default Ball;
