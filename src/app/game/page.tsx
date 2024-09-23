import { ConfigProvider, Layout } from 'antd';
import { CustomHeader } from '@/components/ui/Header';
import { fetchQuizzes } from '@/lib/quizData';
import { TQuiz } from '@/lib/definitions';
import Games from '@/components/game/Games';

export default async function Game() {
  // const quizzes: TQuiz[] = await fetchQuizzes();
  const quizzes: TQuiz[] = [
    { quiz_id: 24, word1: 'erectaaaaaaaaaaaa', word2: 'electaaaaaaaaaaaa' },
    { quiz_id: 15, word1: 'bred', word2: 'bled' },
    { quiz_id: 32, word1: 'frown', word2: 'flown' },
    { quiz_id: 54, word1: 'rice', word2: 'lice' },
    { quiz_id: 2, word1: 'row', word2: 'low' },
  ];

  return (
    <div>
      <CustomHeader />
      <Games quizzes={quizzes} />
    </div>
  );
}
