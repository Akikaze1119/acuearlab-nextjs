import { Layout } from 'antd';
import { CustomHeader } from '@/components/ui/Header';
import { TQuiz } from '@/lib/definitions';
import GameContent from '@/components/game/GameContent';
import { fetchQuizzes } from '@/lib/getQuizData';

export default async function Game() {
  const quizzes: TQuiz[] = await fetchQuizzes();

  return (
    <div>
      <CustomHeader />
      <main>
        <Layout>
          <GameContent quizzes={quizzes} />
        </Layout>
      </main>
    </div>
  );
}
