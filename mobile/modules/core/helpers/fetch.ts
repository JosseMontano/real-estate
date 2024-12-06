import { urls } from "../constants/endpoint";
import { Res } from "../hooks/useGet";

export const handleGet = async <T,>(url: string): Promise<Res<T>> => {
    let errorMg = "";
    try {
      const response = await fetch(urls.endpoint + url,{
        method: "GET",
        headers: new Headers({
          accept: "application/json",
          "Content-Type": "application/json",
        })})
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const data = await response.json() as Res<T>;
  
      return data;
    } catch (error) {
      if (error instanceof Error) {
        errorMg = error.message;
        return {
          message: {
            en: errorMg,
            es: errorMg,
            pt: errorMg,
          },
          val: [] as T,
          status: 500,
        }
      }
    }
    return {
      message: {
        en: errorMg,
        es: errorMg,
        pt: errorMg,
      },
      val: [] as T,
      status: 500,
    };
  }

  /* 
  
  
  export const getServices = async <T>(endPoint: string) => {
  try {
    const { token } = await getCookie("token");
    const response = await fetch(config.backendUrl + endPoint, {
      method: "GET",
      headers: new Headers({
        accept: "application/json",
        "Content-Type": "application/json",
        authorization: token,
      }),
    });

    if (response.ok) {
      const result = await response.json();
      return {
        data: result,
      };
    }
  } catch (err) {
    console.error(err);
  }
};


*/