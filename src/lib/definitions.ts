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

export type TQuiz_data = {
  quiz_id: number;
  isCorrect: boolean;
};

export type TResultForRecord = {
  quiz_id: number;
  word1: string;
  word2: string;
  isCorrect: boolean;
};

export type TBoardData = {
  id: React.Key;
  created_at: string;
  result: TResultForRecord[];
};
