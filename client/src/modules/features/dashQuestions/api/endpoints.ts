import { Delete } from "@/core/utils/fetch";
import { Question } from "../../../shared/types/questions";
import { Res } from "@/core/types/res";


export const fetchQuestions = async (): Promise<Res<Question[]>> => {
  const response = await fetch('http://127.0.0.1:8000/api/questions/');
  
  if (!response.ok) {
    return {
      message: "Error",
      val: [],
      status: response.status,
    }
  }

  const data = await response.json() as Res<Question[]>;
  return data;
};

export const deleteQuestion = async (id:number)=>{
  return await Delete('questions', id)
}
