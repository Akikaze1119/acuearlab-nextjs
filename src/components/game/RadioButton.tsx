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
      style={{
        width: '100%',
        maxWidth: '16rem',
        paddingLeft: '1.5rem',
        paddingRight: '1.5rem',
        paddingTop: '1.5rem',
        paddingBottom: '1.5rem',
        fontSize: '1.25rem',
        lineHeight: '1.75rem',
      }}
      className={cn(
        'bg-sky-100 text-sky-900 rounded-md gap-2',
        isAnswered && 'cursor-not-allowed bg-slate-100'
      )}
    >
      {word}
    </Radio>
  );
};

export default RadioButton;
