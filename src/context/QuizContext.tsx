// context/QuizContext.tsx
'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { TResult, TQuiz } from '@/lib/definitions';
import { useRouter } from 'next/navigation';
import { revalidatePage } from '@/actions/revalidation';

interface QuizContextProps {
  quizzes: TQuiz[];
  currentQuizIndex: number;
  results: TResult[];
  setQuizzes: (quizzes: TQuiz[]) => void;
  setResults: (results: TResult[]) => void;
  setCurrentQuizIndex: (index: number) => void;
  incrementQuizIndex: () => void;
  restartQuiz: () => Promise<void>;
}

const QuizContext = createContext<QuizContextProps | undefined>(undefined);

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const [quizzes, setQuizzes] = useState<TQuiz[]>([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [results, setResults] = useState<TResult[]>([]);

  const incrementQuizIndex = () => {
    setCurrentQuizIndex((prev) => prev + 1);
  };

  const restartQuiz = async () => {
    setCurrentQuizIndex(0);
    setResults([]);
    revalidatePage('/game');
    router.push('/game');
  };

  return (
    <QuizContext.Provider
      value={{
        quizzes,
        currentQuizIndex,
        results,
        setQuizzes,
        setResults,
        setCurrentQuizIndex,
        incrementQuizIndex,
        restartQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuizContext = (): QuizContextProps => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuizContext must be used within a QuizProvider');
  }
  return context;
};
