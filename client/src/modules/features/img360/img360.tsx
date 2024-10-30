import { useParams } from "react-router-dom";

const Img360 = () => {
  const { url } = useParams();
  const decodedUrl = url ? atob(url) : null;

  // Debugging: Log the decoded URL to ensure it's correct
  console.log("Decoded URL:", decodedUrl);

  return (
    <>
      {decodedUrl && (
        <div className="bg-[#282c34] min-h-screen relative flex text-[calc(10px+2vmin)] text-white justify-center">
          {/* @ts-expect-error: a-scene is not a recognized JSX element */}
          <a-scene className="RV">
            {/* @ts-expect-error: a-sky is not a recognized JSX element */}
            <a-sky src={decodedUrl} rotation="0 -130 0"></a-sky>
            {/* @ts-expect-error: Closing tag for a-scene */}
          </a-scene>
        </div>
      )}
    </>
  );
};

export default Img360;