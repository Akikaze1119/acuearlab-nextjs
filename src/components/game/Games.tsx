'use client';
import { useState } from 'react';
import { Layout } from 'antd';
import GameContent from '@/components/game/GameContent';
import ResultContent from '@/components/game/ResultContent';
import { TQuiz, TResult } from '@/lib/definitions';

interface IContentProps {
  quizzes: TQuiz[];
}

const Games = ({ quizzes }: IContentProps) => {
  const [showResult, setShowResult] = useState(false);
  const [results, setResults] = useState<TResult[]>([]);

  return (
    <main>
      <Layout>
        {!showResult && (
          <GameContent quizzes={quizzes} setShowResult={setShowResult} setResults={setResults} />
        )}
        {showResult && <ResultContent quizzes={quizzes} results={results} />}
      </Layout>
    </main>
  );
};

export default Games;
