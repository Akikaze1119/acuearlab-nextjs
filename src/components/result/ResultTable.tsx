'use client';
import { Table } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { useQuizContext } from '@/context/QuizContext';
import { TResultTableData } from '@/lib/definitions';
import WordColumnRender from '@/components/board/WordColumnRender';

const { Column } = Table;

const ResultTable = () => {
  const { results, quizzes } = useQuizContext();

  const data: TResultTableData[] = results.map((result, index) => {
    const quiz = quizzes[index];
    return {
      key: index + 1,
      answer: result.answer,
      word1: quiz.word1,
      word2: quiz.word2,
      isCorrect: result.isCorrect,
    };
  });

  return (
    <Table<TResultTableData>
      dataSource={data}
      pagination={false}
      scroll={{ x: 'max-content' }}
      style={{ maxWidth: '64rem', margin: '0 auto' }}
    >
      <Column title='No' dataIndex='key' key='key' align='center' width='5%' />
      <Column
        title='Result'
        dataIndex='isCorrect'
        key='result'
        align='center'
        width='10%'
        render={(_: any, record: TResultTableData) => {
          return record.isCorrect ? (
            <CheckOutlined style={{ fontSize: '1.5rem', color: '#52c41a' }} />
          ) : (
            <CloseOutlined style={{ fontSize: '1.5rem', color: '#f5222d' }} />
          );
        }}
      />
      <Column title='Correct Answer' dataIndex='answer' key='Answer' width='20%' />
      <Column
        title='Word1'
        dataIndex='word1'
        key='word1'
        render={(_: any, record: TResultTableData) => <WordColumnRender word={record.word1} />}
      />
      <Column
        title='Word2'
        dataIndex='word2'
        key='word2'
        render={(_: any, record: TResultTableData) => <WordColumnRender word={record.word2} />}
      />
    </Table>
  );
};

export default ResultTable;
