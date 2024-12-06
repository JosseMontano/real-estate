import { urls } from "../constants/endpoint";
import { Res } from "../hooks/useGet";

export const handleGet = async <T,>(url: string): Promise<Res<T>> => {
  let errorMg = "";
  try {
    const response = await fetch(urls.endpoint + url, {
      method: "GET",
      headers: new Headers({
        accept: "application/json",
        "Content-Type": "application/json",
      })
    })

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

export const handlePost = async <T>(
  url: string,
  payload: any,
) => {
  let errorMg = "";
  try {
    const response = await fetch(urls.endpoint + url, {
      method: "POST",
      headers: new Headers({
        accept: "application/json",
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json() as Res<T>;

    return {
      message: data.message,
      val: data.val,
      status: data.status,
    }
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
}

