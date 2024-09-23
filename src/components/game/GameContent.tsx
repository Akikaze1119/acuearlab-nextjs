'use client';
import React, { useState } from 'react';
import { Button, Progress } from 'antd';
import { CheckCircleFilled, PlayCircleFilled } from '@ant-design/icons';
import { Quiz, Quizzes } from '@/lib/definitions';
import { speakText } from '@/lib/speakText';
import WordButtons from './WordButtons';
import { cn } from '@/lib/utils';

interface GameContentProps {
  quizzes: Quizzes;
  setShowResult: (value: boolean) => void;
}

const GameContent = ({ quizzes, setShowResult }: GameContentProps) => {
  const [current, setCurrent] = useState(0);
  const [answer, setAnswer] = useState<string>(getRandomWord(quizzes[0]));
  const [message, setMessage] = useState<string>('');
  const [isAnswered, setIsAnswered] = useState(false);
  const questionCount = quizzes.length;

  function getRandomWord(quiz: Quiz): string {
    const randomIndex = Math.floor(Math.random() * 2);
    return randomIndex === 0 ? quiz.word1 : quiz.word2;
  }

  function selectAnswer(option: string): void {
    setIsAnswered(() => true);
    if (option === answer) {
      setMessage('Correct!');
    } else {
      setMessage('Incorrect!');
    }
  }

  function next() {
    setCurrent(current + 1);
    setAnswer(getRandomWord(quizzes[current + 1]));
    setMessage('');
    setIsAnswered(false);
  }

  return (
    <div className='w-full mx-5 mt-10 flex flex-col items-center h-96  md:mx-auto  md:w-1/2'>
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
            answer={answer}
            currentQuiz={quizzes[current]}
            isAnswered={isAnswered}
            onSelectAnswer={selectAnswer}
          />
          {isAnswered && (
            <>
              <div
                className={cn(
                  'text-2xl text-center mt-12 w-full py-4 rounded-md',
                  message === 'Correct!' ? 'text-green-500 bg-lime-300' : 'text-red-500 bg-rose-200'
                )}
              >
                {message}
              </div>
              <Button className='px-12 py-6 mt-8 text-xl' type='primary' onClick={() => next()}>
                Next
              </Button>
            </>
          )}
        </>
      )}
      {current === questionCount - 1 && (
        <div className='flex gap-20'>
          <WordButtons
            answer={answer}
            currentQuiz={quizzes[current]}
            isAnswered={isAnswered}
            onSelectAnswer={selectAnswer}
          />

          {isAnswered && (
            <Button className='px-12 py-6  mt-12' onClick={() => setShowResult(true)}>
              View Result
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default GameContent;
