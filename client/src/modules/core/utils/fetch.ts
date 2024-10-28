import { urls } from "../config/endpoint";

interface Reponse {
  val: string;
}

export const handlePost = async <T>(
  url: string,
  payload: T
): Promise<Reponse> => {
  let errorMg = "";
  try {
    const response = await fetch(urls.endpoint + url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return {
      val: data.val,
    };
  } catch (error) {
    if (error instanceof Error) {
      errorMg = error.message;
    }
  }
  return {
    val: errorMg,
  };
};
