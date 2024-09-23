'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Progress } from 'antd';
import { PlayCircleFilled } from '@ant-design/icons';
import { TQuiz } from '@/lib/definitions';
import { speakText } from '@/lib/speakText';
import { cn } from '@/lib/utils';
import { TResult } from '@/lib/definitions';
import WordButtons from '@/components/game/WordButtons';
interface GameContentProps {
  quizzes: TQuiz[];
}

const GameContent = ({ quizzes }: GameContentProps) => {
  const [current, setCurrent] = useState(0);
  const [answer, setAnswer] = useState<string>(getRandomWord(quizzes[0]));
  const [message, setMessage] = useState<string>('');
  const [results, setResults] = useState<TResult[]>([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const questionCount = quizzes.length;
  const router = useRouter();

  function getRandomWord(quiz: TQuiz): string {
    const randomIndex = Math.floor(Math.random() * 2);
    return randomIndex === 0 ? quiz.word1 : quiz.word2;
  }

  function selectAnswer(option: string): void {
    setIsAnswered(() => true);
    const result: TResult = {
      quiz_id: quizzes[current].quiz_id,
      answer: answer,
      isCorrect: option === answer,
    };
    if (option === answer) {
      setMessage('Correct!');
      setResults((prev) => [...prev, result]);
    } else {
      setMessage('Incorrect!');
      setResults((prev) => [...prev, result]);
    }
  }

  function next() {
    setCurrent(current + 1);
    setAnswer(getRandomWord(quizzes[current + 1]));
    setMessage('');
    setIsAnswered(false);
  }

  const handleNavigateResult = () => {
    const searchParams = new URLSearchParams({
      quizzes: JSON.stringify(quizzes),
      results: JSON.stringify(results),
    });

    router.push(`/result?${searchParams.toString()}`);
  };

  return (
    <div className='w-full md:w-2/3 px-10 mt-10 flex flex-col items-center md:mx-auto'>
      <Progress percent={Number(`${(100 / 5) * current}`)} showInfo={false} className={'mb-20'} />
      <Button
        size={'large'}
        type={'primary'}
        className='px-12 py-6 mb-12'
        onClick={() => speakText(answer)}
      >
        <PlayCircleFilled style={{ fontSize: '2rem' }} />
      </Button>
      {current < questionCount - 1 && (
        <>
          <WordButtons
            currentQuiz={quizzes[current]}
            isAnswered={isAnswered}
            onSelectAnswer={selectAnswer}
          />
          {isAnswered && (
            <>
              <div
                className={cn(
                  'text-2xl text-center mt-12 w-full py-4 rounded-md',
                  message === 'Correct!' ? 'text-lime-800 bg-lime-200' : 'text-rose-800 bg-rose-200'
                )}
              >
                <p className='mb-4'>{message}</p>
                <Button className='px-12 py-6 text-xl' type='primary' onClick={() => next()}>
                  Next
                </Button>
              </div>
            </>
          )}
        </>
      )}
      {current === questionCount - 1 && (
        <>
          <WordButtons
            currentQuiz={quizzes[current]}
            isAnswered={isAnswered}
            onSelectAnswer={selectAnswer}
          />

          {isAnswered && (
            <div
              className={cn(
                'text-2xl text-center mt-12 w-full py-4 rounded-md',
                message === 'Correct!' ? 'text-lime-800 bg-lime-200' : 'text-rose-800 bg-rose-200'
              )}
            >
              <p className='mb-4'>{message}</p>
              <Button className='px-12 py-6 text-xl' type='primary' onClick={handleNavigateResult}>
                View Result
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default GameContent;
