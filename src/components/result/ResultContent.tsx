'use client';
import { FrownOutlined, SmileOutlined } from '@ant-design/icons';
import Title from 'antd/es/typography/Title';
import { useQuizContext } from '@/context/QuizContext';
import ResultButtons from '@/components/result/ResultButtons';
import ResultTable from './ResultTable';

const ResultContent = () => {
  const { results, quizzes } = useQuizContext();

  const total = quizzes.length;
  const correct = results.filter((result) => result.isCorrect).length;
  const goodResult = correct > total / 2;

  return (
    <div className='mx-4'>
      <div className='flex flex-col items-center mb-6 gap-2'>
        <Title style={{ marginBottom: 1, color: '#2cb0c7' }}>
          <span className='mr-4'>Results:</span>
          <span className='mr-2'>
            {correct}/{total}
          </span>
          <span>{goodResult ? <SmileOutlined /> : <FrownOutlined />}</span>
        </Title>
      </div>
      <ResultTable />
      <ResultButtons />
    </div>
  );
};

export default ResultContent;
