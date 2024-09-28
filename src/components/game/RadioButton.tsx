import { Radio } from 'antd';
import { cn } from '@/lib/utils';

interface RadioButtonProps {
  word: string;
  isAnswered: boolean;
}

const RadioButton = ({ word, isAnswered }: RadioButtonProps) => {
  return (
    <Radio
      value={word}
      disabled={isAnswered}
      className={cn(
        'bg-sky-100 text-sky-900 w-full max-w-64 px-6 py-6 text-xl rounded-md gap-2',
        isAnswered && 'cursor-not-allowed bg-slate-100'
      )}
    >
      {word}
    </Radio>
  );
};

export default RadioButton;
