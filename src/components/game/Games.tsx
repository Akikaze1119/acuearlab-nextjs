'use client';
import { useState } from 'react';
import { Layout } from 'antd';
import GameContent from '@/components/game/GameContent';
import ResultContent from '@/components/game/ResultContent';
import { Quizzes } from '@/lib/definitions';

interface IContentProps {
  quizzes: Quizzes;
}

const Games = ({ quizzes }: IContentProps) => {
  const [showResult, setShowResult] = useState(false);

  return (
    <Layout>
      {!showResult && <GameContent quizzes={quizzes} setShowResult={setShowResult} />}
      {showResult && <ResultContent />}
    </Layout>
  );
};

export default Games;
