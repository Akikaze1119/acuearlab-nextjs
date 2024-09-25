'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Progress } from 'antd';
import { PlayCircleFilled } from '@ant-design/icons';
import { useQuizContext } from '@/context/QuizContext';
import { TQuiz } from '@/lib/definitions';
import { speakText } from '@/lib/speakText';
import { cn } from '@/lib/utils';
import WordButtons from '@/components/game/WordButtons';
import { createRecord } from '@/actions/quizResult';
interface GameContentProps {
  quizzes: TQuiz[];
}

const GameContent = ({ quizzes }: GameContentProps) => {
  const router = useRouter();

  const { currentQuizIndex, results, setQuizzes, setResults, incrementQuizIndex } =
    useQuizContext();

  useEffect(() => {
    setQuizzes(quizzes);
  }, [quizzes, setQuizzes]);

  const [answer, setAnswer] = useState<string>(getRandomWord(quizzes[0]));
  const [message, setMessage] = useState<string>('');
  const [isAnswered, setIsAnswered] = useState(false);
  const questionCount = quizzes.length;

  // choose a correct answer randomly
  function getRandomWord(quiz: TQuiz): string {
    const randomIndex = Math.floor(Math.random() * 2);
    return randomIndex === 0 ? quiz.word1 : quiz.word2;
  }

  function handleSelectAnswer(option: string): void {
    setIsAnswered(() => true);
    const isCorrect = option === answer;
    const result = {
      quiz_id: quizzes[currentQuizIndex].quiz_id,
      answer: option,
      isCorrect,
    };

    if (isCorrect) {
      setMessage('Correct!');
    } else {
      setMessage('Incorrect!');
    }

    setResults([...results, result]);
  }

  function next() {
    incrementQuizIndex();
    setAnswer(getRandomWord(quizzes[currentQuizIndex + 1]));
    setMessage('');
    setIsAnswered(false);
  }

  async function handleViewResult() {
    if (!results) return;
    const quiz_data = quizzes.map((quiz) => {
      const result = results.find((r) => r.quiz_id === quiz.quiz_id);
      return {
        quiz_id: quiz.quiz_id,
        isCorrect: result?.isCorrect ?? false,
      };
    });

    await createRecord(quiz_data);
    router.push('/result');
  }

  return (
    <div className='w-full md:w-2/3 px-10 mt-10 flex flex-col items-center md:mx-auto'>
      <Progress
        percent={Number(`${(100 / 5) * currentQuizIndex}`)}
        showInfo={false}
        className={'mb-20'}
      />
      <Button
        size={'large'}
        type={'primary'}
        className='px-12 py-6 mb-12'
        onClick={() => speakText(answer)}
      >
        <PlayCircleFilled style={{ fontSize: '2rem' }} />
      </Button>
      {currentQuizIndex < questionCount - 1 && (
        <>
          <WordButtons
            currentQuiz={quizzes[currentQuizIndex]}
            isAnswered={isAnswered}
            onSelectAnswer={handleSelectAnswer}
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
      {currentQuizIndex === questionCount - 1 && (
        <>
          <WordButtons
            currentQuiz={quizzes[currentQuizIndex]}
            isAnswered={isAnswered}
            onSelectAnswer={handleSelectAnswer}
          />

          {isAnswered && (
            <div
              className={cn(
                'text-2xl text-center mt-12 w-full py-4 rounded-md',
                message === 'Correct!' ? 'text-lime-800 bg-lime-200' : 'text-rose-800 bg-rose-200'
              )}
            >
              <p className='mb-4'>{message}</p>
              <Button className='px-12 py-6 text-xl' type='primary' onClick={handleViewResult}>
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
