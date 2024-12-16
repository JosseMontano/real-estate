import { Delete, handleGet } from "@/core/utils/fetch";
import { Question } from "../../../shared/types/questions";
import { Res } from "@/core/types/res";
import { Statistic } from "@/core/types/statistic";

export const fetchQuestions = async (): Promise<Res<Question[]>> => {
  return await handleGet<Question[]>('questions')
};

export const getStadisticsQuestion = async (): Promise<Res<Statistic>> => {
  return await handleGet<Statistic>('questions/statistics')
}

export const deleteQuestion = async (id: number) => {
  return await Delete('questions', id)
}

export const deleteFollow = async (id: number) => {
  return await Delete('follows', id)
}
