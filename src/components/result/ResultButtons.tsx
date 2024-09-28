'use client';

import { useRouter } from 'next/navigation';
import { Button } from 'antd';
import { HistoryOutlined, PlayCircleOutlined, ReloadOutlined } from '@ant-design/icons';
import { useQuizContext } from '@/context/QuizContext';

const ResultButtons = () => {
  const router = useRouter();
  const { restartQuiz } = useQuizContext();

  return (
    <div className='flex justify-center gap-4 mt-6'>
      <Button type='primary' onClick={restartQuiz}>
        New Game
        <PlayCircleOutlined />
      </Button>
      <Button onClick={() => router.push('/board')}>
        Record
        <HistoryOutlined />
      </Button>
    </div>
  );
};

export default ResultButtons;
