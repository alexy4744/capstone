import { callApi } from "../utils/call-api";

export type Answer = {
  answer: string;
  created_at: string;
  is_correct: boolean;
  question: number;
};

export type Question = {
  calculator: boolean;
  category: "HOA" | "PSD" | "PAM" | "GEO" | "TRI";
  created_at: string;
  difficulty: 1 | 2 | 3;
  id: number;
  image: string;
  multiple_choice: boolean;
  title: string;
};

export type SubmittedAnswer = {
  created_at: string;
  question: number;
  submitted_answer?: number;
  user_id: string;
};

export const answerQuestion = async (
  questionId: number,
  answer: string
): Promise<SubmittedAnswer> => {
  const response = await callApi(`/api/submit-response/${questionId}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_input: answer,
    }),
  });

  return response.json();
};

export const getQuestion = async (questionId: number): Promise<Question> => {
  const response = await callApi(`/api/questions/${questionId}`);

  return response.json();
};

export const getQuestions = async (): Promise<Question[]> => {
  const response = await callApi("/api/questions");

  return response.json();
};
