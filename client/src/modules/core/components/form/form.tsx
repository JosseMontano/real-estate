import { useState } from "react";
import Btn from "./button";
import Ball from "./ball";

type Props = {
  children: JSX.Element;
  children2?: JSX.Element;
  isPending: boolean;
  handleOnSubmit: () => void;
  btnText?: string;
  spaceBtn?: boolean;
  smallBtn?: boolean;
  centerBtn?: boolean;
  showBtn?: boolean;
  useMargin?: boolean;
};
const FormComponent = ({
  children,
  children2,
  handleOnSubmit,
  isPending,
  btnText = "",
  spaceBtn = true,
  smallBtn,
  centerBtn = false,
  showBtn = true,
  useMargin = true,
}: Props) => {
  const [currentVisible, setCurrentVisible] = useState(1);

  return (
    <form
      onSubmit={handleOnSubmit}
      className={`flex flex-col ${spaceBtn ? "gap-2" : ""}`}
    >
      {currentVisible == 1 && children}
      {currentVisible == 2 && children2}

      <div className={`${useMargin ? "mt-4" : ""}`}>
        {children2 && (
          <div className="flex justify-center gap-[2px] my-1">
            <Ball
              currentVisible={currentVisible}
              value={1}
              setCurrentVisible={(val) => setCurrentVisible(val)}
            />
            <Ball
              currentVisible={currentVisible}
              value={2}
              setCurrentVisible={(val) => setCurrentVisible(val)}
            />
          </div>
        )}
        {showBtn && (
          <div className={`${centerBtn ? "flex justify-center" : ""}`}>
            <Btn
              isPending={isPending}
              text={btnText}
              disabled={children2 ? currentVisible != 2 : false}
              smallBtn={smallBtn}
            />
          </div>
        )}
      </div>
    </form>
  );
};

export default FormComponent;
