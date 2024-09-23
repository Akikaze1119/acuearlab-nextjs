import { Table } from 'antd';
import {
  CheckOutlined,
  CloseOutlined,
  FrownOutlined,
  PlayCircleFilled,
  SmileOutlined,
} from '@ant-design/icons';
import Title from 'antd/es/typography/Title';
import { TQuiz, TResult } from '@/lib/definitions';
import { speakText } from '@/lib/speakText';
import ResultButtons from '@/components/result/ResultButtons';

type ResultContentProps = {
  quizzes: TQuiz[];
  results: TResult[];
};

const { Column, ColumnGroup } = Table;

interface DataType {
  key: React.Key;
  answer: string;
  word1: string;
  word2: string;
  isCorrect: boolean;
}

const ResultContent = ({ quizzes, results }: ResultContentProps) => {
  const data: DataType[] = results.map((result, index) => {
    const quiz = quizzes[index];
    return {
      key: index + 1,
      answer: result.answer,
      word1: quiz.word1,
      word2: quiz.word2,
      isCorrect: result.isCorrect,
    };
  });
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
      <Table<DataType> dataSource={data} pagination={false}>
        <Column title='No' dataIndex='key' key='key' align='center' />
        <Column
          title='Result'
          dataIndex='isCorrect'
          key='result'
          align='center'
          render={(_: any, record: DataType) => {
            return record.isCorrect ? (
              <CheckOutlined style={{ fontSize: '1.5rem', color: '#52c41a' }} />
            ) : (
              <CloseOutlined style={{ fontSize: '1.5rem', color: '#f5222d' }} />
            );
          }}
        />
        <Column title='Correct Answer' dataIndex='answer' key='Answer' align='center' />
        <ColumnGroup title='Word1'>
          <Column title='Word' dataIndex='word1' key='word1' align='center' />
          <Column
            title='Sound'
            dataIndex='word1-sound'
            key='word1-sound'
            align='center'
            render={(_: any, record: DataType) => (
              <a className='rounded-full' onClick={() => speakText(record.word1)}>
                <PlayCircleFilled style={{ fontSize: '1.5rem', color: '#2cb0c7' }} />
              </a>
            )}
          />
        </ColumnGroup>
        <ColumnGroup title='Word2'>
          <Column title='Word' dataIndex='word2' key='word2' align='center' />
          <Column
            title='Sound'
            dataIndex='word2-sound'
            key='word2-sound'
            align='center'
            render={(_: any, record: DataType) => (
              <a className='rounded-full' onClick={() => speakText(record.word2)}>
                <PlayCircleFilled style={{ fontSize: '1.5rem', color: '#2cb0c7' }} />
              </a>
            )}
          />
        </ColumnGroup>
      </Table>

      <ResultButtons />
    </div>
  );
};

export default ResultContent;
