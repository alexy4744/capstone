import { callApi } from "../utils/call-api";

/**
 * The response from the API when requesting user statistics. This is not exported because we will convert it to a more friendly format.
 */
type RawUserStatistics = {
  /**
   * The number of correct responses for each difficulty level. The key of the object is the difficulty level,
   * and the value is an array of submission IDs. The length of the array is the number of correct responses.
   * If the user has not answered any questions of a certain difficulty level, the key will not exist.
   */
  correct_responses: {
    1?: number[];
    2?: number[];
    3?: number[];
  };

  /**
   * The number of incorrect responses for each difficulty level. The key of the object is the difficulty level,
   * and the value is an array of submission IDs. The length of the array is the number of incorrect responses.
   * If the user has not answered any questions of a certain difficulty level, the key will not exist.
   */
  incorrect_responses: {
    1?: number[];
    2?: number[];
    3?: number[];
  };

  user_id: string;
};

export type UserStatistics = {
  easy: {
    totalCorrect: number;
    totalIncorrect: number;
  };
  normal: {
    totalCorrect: number;
    totalIncorrect: number;
  };
  hard: {
    totalCorrect: number;
    totalIncorrect: number;
  };
};

export const getUserStatistics = async (): Promise<UserStatistics> => {
  const data: RawUserStatistics = await callApi("/api/home").then((res) => res.json());

  return {
    easy: {
      totalCorrect: data.correct_responses[1]?.length ?? 0,
      totalIncorrect: data.incorrect_responses[1]?.length ?? 0,
    },
    normal: {
      totalCorrect: data.correct_responses[2]?.length ?? 0,
      totalIncorrect: data.incorrect_responses[2]?.length ?? 0,
    },
    hard: {
      totalCorrect: data.correct_responses[3]?.length ?? 0,
      totalIncorrect: data.incorrect_responses[3]?.length ?? 0,
    },
  };
};
