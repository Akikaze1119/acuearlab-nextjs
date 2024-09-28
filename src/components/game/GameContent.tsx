'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Progress, Spin } from 'antd';
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
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
    setIsLoading(true);
    if (!results) return;
    const quiz_data = quizzes.map((quiz) => {
      const result = results.find((r) => r.quiz_id === quiz.quiz_id);
      return {
        quiz_id: quiz.quiz_id,
        isCorrect: result?.isCorrect ?? false,
      };
    });

    try {
      await createRecord(quiz_data);
    } catch (e) {
      console.log(e);
    } finally {
      router.push('/result');
      setIsLoading(false);
    }
  }

  return (
    <div className='w-full md:w-2/3 px-10 mt-10 flex flex-col items-center md:mx-auto'>
      <Spin spinning={isLoading} fullscreen />
      <Progress
        percent={Number(`${(100 / 5) * currentQuizIndex}`)}
        showInfo={false}
        style={{ marginBottom: '3rem' }}
      />
      <Button
        size={'large'}
        type={'primary'}
        style={{
          paddingLeft: '3rem',
          paddingRight: '3rem',
          paddingTop: '1.5rem',
          paddingBottom: '1.5rem',
          marginBottom: '3rem',
        }}
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
                <Button
                  style={{
                    paddingLeft: '3rem',
                    paddingRight: '3rem',
                    paddingTop: '1.5rem',
                    paddingBottom: '1.5rem',
                    fontSize: '1.25rem',
                  }}
                  type='primary'
                  onClick={() => next()}
                >
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
              <Button
                style={{
                  paddingLeft: '3rem',
                  paddingRight: '3rem',
                  paddingTop: '1.5rem',
                  paddingBottom: '1.5rem',
                  fontSize: '1.25rem',
                }}
                type='primary'
                onClick={handleViewResult}
              >
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
