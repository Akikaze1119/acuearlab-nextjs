'use client';
import { TWeakDataWithWords, TWeakTableData } from '@/lib/definitions';
import { Table } from 'antd';
import WordColumnRender from '@/components/board/WordColumnRender';

const { Column } = Table;

interface WeakWordsTableProps {
  weakRecords: TWeakDataWithWords[];
}

const WeakWordsTable = ({ weakRecords }: WeakWordsTableProps) => {
  const weakDataTable: TWeakTableData[] = weakRecords.map((record) => ({
    key: Number(record.id),
    weak_id: record.weak_id,
    word1: record.word1,
    word2: record.word2,
    times_answered: record.times_answered,
    times_incorrect: record.times_incorrect,
    incorrect_rate: Math.round((record.times_incorrect / record.times_answered) * 100),
  }));

  return (
    <Table dataSource={weakDataTable} pagination={false} scroll={{ x: 'max-content' }}>
      <Column
        title='No'
        dataIndex='key'
        key='key'
        align='center'
        width={'5%'}
        sorter={(a: TWeakTableData, b: TWeakTableData) => a.key - b.key}
      />
      <Column
        title='Times Incorrect'
        dataIndex='times_incorrect'
        key='times_incorrect'
        align='center'
        width={'10%'}
        sorter={(a: TWeakTableData, b: TWeakTableData) => a.times_incorrect - b.times_incorrect}
      />
      <Column
        title='Times Answered'
        dataIndex='times_answered'
        key='times_answered'
        align='center'
        width={'10%'}
        responsive={['md', 'lg', 'xl', 'xxl']}
        sorter={(a: TWeakTableData, b: TWeakTableData) => a.times_answered - b.times_answered}
      />
      <Column
        title='Incorrect Rate'
        dataIndex='incorrect_rate'
        key='incorrect_rate'
        align='center'
        width={'10%'}
        responsive={['md', 'lg', 'xl', 'xxl']}
        render={(value: number) => `${value}%`}
        sorter={(a: TWeakTableData, b: TWeakTableData) => a.incorrect_rate - b.incorrect_rate}
      />
      <Column
        title='Word1'
        dataIndex='word1'
        key='word1'
        render={(_: any, record: TWeakTableData) => <WordColumnRender word={record.word1} />}
      />
      <Column
        title='Word2'
        dataIndex='word2'
        key='word2'
        render={(_: any, record: TWeakTableData) => <WordColumnRender word={record.word2} />}
      />
    </Table>
  );
};

export default WeakWordsTable;
