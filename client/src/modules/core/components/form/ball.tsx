import { primaryColor } from "@/const/colors";

type Props = {
  currentVisible: number;
  value: number;
  setCurrentVisible: (value: number) => void;
};
const Ball = ({ currentVisible, value, setCurrentVisible }: Props) => {
  return (
    <span
      className="w-[10px] h-[10px] rounded-full cursor-pointer"
      style={{
        background: currentVisible == value ? "#5dff9d" : primaryColor,
      }}
      onClick={() => setCurrentVisible(value)}
    ></span>
  );
};

export default Ball;
