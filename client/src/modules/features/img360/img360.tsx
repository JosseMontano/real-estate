import use360photo from "@/core/store/360photo";
import { handlePost } from "@/core/utils/fetch";
import { useEffect, useState } from "react";

const Img360 = () => {
  const {url} =use360photo()
  const [img, setImg] = useState("");

  useEffect(() => {
    const handleGetImage = async () => {
      try {
        const res = await handlePost("fetch_image", { url }, true);
        
        const base64data = await new Promise((resolve) => {
          const reader = new FileReader();
          //@ts-ignore
          reader.onloadend = () => resolve(reader.result);
          //@ts-ignore
          reader.readAsDataURL(res);
        }) as string;
        setImg(base64data);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    handleGetImage();
  }, [url]);

  return (
    <>
      {img && (
        <div className="bg-[#282c34] min-h-screen relative flex text-[calc(10px+2vmin)] text-white justify-center">
          {/* @ts-expect-error: a-scene is not a recognized JSX element */}
          <a-scene className="RV">
            {/* @ts-expect-error: a-sky is not a recognized JSX element */}
            <a-sky src={img} rotation="0 -130 0"></a-sky>
            {/* @ts-expect-error: Closing tag for a-scene */}
          </a-scene>
        </div>
      )}
    </>
  );
};

export default Img360;
