import { Layout } from 'antd';
import GameContent from '@/components/game/GameContent';
import { TQuiz } from '@/lib/definitions';

interface IContentProps {
  quizzes: TQuiz[];
}

const Games = ({ quizzes }: IContentProps) => {
  return (
    <main>
      <Layout>
        <GameContent quizzes={quizzes} />
      </Layout>
    </main>
  );
};

export default Games;
