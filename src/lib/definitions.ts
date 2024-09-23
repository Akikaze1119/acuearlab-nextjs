export type TQuiz = {
  quiz_id: number;
  word1: string;
  word2: string;
};

export type TResult = {
  quiz_id: number;
  answer: string;
  isCorrect: boolean;
};
