import { urls } from "../config/endpoint";
import { Res } from "@/core/types/res";


export const handlePost = async <T>(
  url: string,
  payload: any,
) => {
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
        message: errorMg,
        val: [] as T,
        status: 500,
    }
  }
  return {
    message: errorMg,
    val: [] as T,
    status: 500,
};
}}

export const handlePostBlob = async <T>(
  url: string,
  payload: T,
) => {
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

    //@ts-ignore
   return response.blob(); 

  } catch (error) {
    if (error instanceof Error) {
      errorMg = error.message;
      return {
        message: errorMg,
        val: [] as T,
        status: 500,
    }
  }
  return {
    message: errorMg,
    val: [] as T,
    status: 500,
};
}}

export const Delete = async (url: string, id: number) => {
  const response = await fetch(urls.endpoint + `${url}/${id}`, {
    method: 'DELETE'
  })
  const data = await response.json()
  return data
}

export const handleGet = async <T,>(url: string): Promise<Res<T>> => {

  const response = await fetch(urls.endpoint + url)

  if (!response.ok) {
    return {
      message: "Error",
      val: [] as T,
      status: response.status,
    }
  }

  const data = await response.json();
  
  return data;

}

export const handlePut = async <T>(
  url: string,
  payload: any,
): Promise<{ message: string; val: T | T[]; status: number }> => {
  let errorMg = "";
  try {
    const response = await fetch(urls.endpoint + url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = (await response.json()) as Res<T>;

    return {
      message: data.message,
      val: data.val,
      status: data.status,
    };
  } catch (error) {
    if (error instanceof Error) {
      errorMg = error.message;
    }
    return {
      message: errorMg,
      val: [] as T,
      status: 500,
    };
  }
};
