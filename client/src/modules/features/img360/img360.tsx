import Img1 from "@/shared/assets/drilldown.jpg";

const Img360 = () => {
  return (
    <>
      {Img1 && (
        <div className="bg-[#282c34] min-h-screen relative flex text-[calc(10px+2vmin)] text-white justify-center">
          {/* @ts-expect-error: a-scene is not a recognized JSX element */}
          <a-scene className="RV">
            {/* @ts-expect-error: a-sky is not a recognized JSX element */}
            <a-sky src={Img1} rotation="0 -130 0"></a-sky>
            {/* @ts-expect-error: Closing tag for a-scene */}
          </a-scene>
        </div>
      )}
    </>
  );
};

export default Img360;
