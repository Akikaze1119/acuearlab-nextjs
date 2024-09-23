'use client';
import { Quiz } from '@/lib/definitions';
import { CheckCircleFilled } from '@ant-design/icons';
import { Button } from 'antd';
import { useState } from 'react';

interface WordButtonsProps {
  answer: string;
  currentQuiz: Quiz;
  isAnswered: boolean;
  onSelectAnswer: (option: string) => void;
}

const WordButtons = ({ answer, currentQuiz, isAnswered, onSelectAnswer }: WordButtonsProps) => {
  const commonBtnClass = 'w-52 text-center py-8 text-lg';
  const [option, setOption] = useState<string>('');
  console.log('option', option);
  console.log('answer', answer);

  return (
    <div className='flex gap-20'>
      <Button
        type='default'
        size={'large'}
        className={commonBtnClass}
        disabled={isAnswered}
        onClick={() => {
          onSelectAnswer(`${currentQuiz.word1}`), setOption(`${currentQuiz.word1}`);
        }}
      >
        {currentQuiz.word1}
        {option === currentQuiz.word1 && (
          <CheckCircleFilled style={{ fontSize: '1rem', color: 'green' }} />
        )}
      </Button>
      <Button
        type='default'
        size={'large'}
        className={commonBtnClass}
        disabled={isAnswered}
        onClick={() => {
          onSelectAnswer(`${currentQuiz.word2}`), setOption(`${currentQuiz.word2}`);
        }}
      >
        {currentQuiz.word2}
        {option === currentQuiz.word2 && (
          <CheckCircleFilled style={{ fontSize: '1rem', color: 'green' }} />
        )}
      </Button>
    </div>
  );
};

export default WordButtons;
