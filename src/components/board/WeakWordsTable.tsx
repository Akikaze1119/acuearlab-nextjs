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
    key: record.id,
    weak_id: record.weak_id,
    word1: record.word1,
    word2: record.word2,
    times_answered: record.times_answered,
    times_incorrect: record.times_incorrect,
    incorrect_rate: `${(record.times_incorrect / record.times_answered) * 100}%`,
  }));

  return (
    <Table dataSource={weakDataTable} pagination={false} scroll={{ x: 'max-content' }}>
      <Column title='No' dataIndex='key' key='key' align='center' width={'5%'} />
      <Column
        title='Times Incorrect'
        dataIndex='times_incorrect'
        key='times_incorrect'
        align='center'
        width={'10%'}
      />
      <Column
        title='Times Answered'
        dataIndex='times_answered'
        key='times_answered'
        align='center'
        width={'10%'}
        responsive={['md', 'lg', 'xl', 'xxl']}
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
