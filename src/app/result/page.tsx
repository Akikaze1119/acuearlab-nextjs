'use client';
import { useSearchParams } from 'next/navigation';
import { TQuiz, TResult } from '@/lib/definitions';
import ResultContent from '@/components/result/ResultContent';
import { CustomHeader } from '@/components/ui/Header';

const Result = () => {
  const searchParams = useSearchParams();
  const quizzes: TQuiz[] = JSON.parse(searchParams.get('quizzes') || '[]');
  const results: TResult[] = JSON.parse(searchParams.get('results') || '[]');

  return (
    <div>
      <CustomHeader />
      <ResultContent quizzes={quizzes} results={results} />
    </div>
  );
};

export default Result;
