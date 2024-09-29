// context/QuizContext.tsx
'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { TResult, TQuiz } from '@/lib/definitions';

interface QuizContextProps {
  quizzes: TQuiz[];
  currentQuizIndex: number;
  results: TResult[];
  setQuizzes: (quizzes: TQuiz[]) => void;
  setResults: (results: TResult[]) => void;
  setCurrentQuizIndex: (index: number) => void;
  incrementQuizIndex: () => void;
}

const QuizContext = createContext<QuizContextProps | undefined>(undefined);

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [quizzes, setQuizzes] = useState<TQuiz[]>([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [results, setResults] = useState<TResult[]>([]);

  const incrementQuizIndex = () => {
    setCurrentQuizIndex((prev) => prev + 1);
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
