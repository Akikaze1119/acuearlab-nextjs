'use client';
import { Quiz } from '@/lib/definitions';
import { CheckCircleFilled } from '@ant-design/icons';
import { Button } from 'antd';
import { useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import { Radio } from 'antd';
import RadioButton from './RadioButton';
import { div } from 'framer-motion/client';

interface WordButtonsProps {
  currentQuiz: Quiz;
  isAnswered: boolean;
  onSelectAnswer: (option: string) => void;
}

const WordButtons = ({ currentQuiz, isAnswered, onSelectAnswer }: WordButtonsProps) => {
  const [value, setValue] = useState<string>('');

  const onChange = (e: RadioChangeEvent) => {
    const selectedValue = e.target.value;
    setValue(selectedValue);
    onSelectAnswer(selectedValue);
    console.log('selectedValue', selectedValue);
  };

  return (
    <div className='w-full'>
      <Radio.Group onChange={onChange} value={value} className='flex justify-evenly gap-5'>
        <RadioButton word={currentQuiz.word1} isAnswered={isAnswered} />
        <RadioButton word={currentQuiz.word2} isAnswered={isAnswered} />
      </Radio.Group>
    </div>
  );
};

export default WordButtons;
