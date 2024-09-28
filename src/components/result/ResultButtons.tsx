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
      <Button type='primary' onClick={restartQuiz} size={'large'} style={{ fontSize: '1.1rem' }}>
        New Game
        <PlayCircleOutlined />
      </Button>
      <Button onClick={() => router.push('/board')} size={'large'} style={{ fontSize: '1.1rem' }}>
        Record
        <HistoryOutlined />
      </Button>
    </div>
  );
};

export default ResultButtons;
