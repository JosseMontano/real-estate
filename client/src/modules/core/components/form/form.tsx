import { useState } from "react";
import Btn from "./button";
import Ball from "./ball";

type Props = {
  children: JSX.Element;
  children2?: JSX.Element;
  isPending: boolean;
  handleOnSubmit: () => void;
  btnText?: string;
};
const FormComponent = ({
  children,
  children2,
  handleOnSubmit,
  isPending,
  btnText = "",
}: Props) => {
  const [currentVisible, setCurrentVisible] = useState(1);

  return (
    <form onSubmit={handleOnSubmit}>
      {currentVisible == 1 && children}
      {currentVisible == 2 && children2}

      <div className="mt-4">
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

        <Btn
          isPending={isPending}
          text={btnText}
          disabled={children2 ? currentVisible != 2 : false}
        />
      </div>
    </form>
  );
};

export default FormComponent;
