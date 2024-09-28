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

export type TResultWithWords = {
  quiz_id: number;
  word1: string;
  word2: string;
  isCorrect: boolean;
};

export type TBoardData = {
  id: React.Key;
  created_at: string;
  result: TResultWithWords[];
};

export type TWeakData = {
  weak_id: number;
  quiz_id: number;
  times_answered: number;
  times_incorrect: number;
};

export type TWeakDataWithWords = {
  id: React.Key;
  weak_id: number;
  word1: string;
  word2: string;
  times_answered: number;
  times_incorrect: number;
};

export type TWeakTableData = {
  id: React.Key;
  weak_id: number;
  word1: string;
  word2: string;
  times_answered: number;
  times_incorrect: number;
  incorrect_rate: string;
};
