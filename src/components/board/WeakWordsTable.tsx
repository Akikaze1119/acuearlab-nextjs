'use client';
import { TWeakDataWithWords, TWeakTableData } from '@/lib/definitions';
import { speakText } from '@/lib/speakText';
import { PlayCircleFilled } from '@ant-design/icons';
import { Table } from 'antd';

const { Column, ColumnGroup } = Table;

interface WeakWordsTableProps {
  weakRecords: TWeakDataWithWords[];
}

const WeakWordsTable = ({ weakRecords }: WeakWordsTableProps) => {
  const weakDataTable: TWeakTableData[] = weakRecords.map((record) => ({
    id: record.id,
    weak_id: record.weak_id,
    word1: record.word1,
    word2: record.word2,
    times_answered: record.times_answered,
    times_incorrect: record.times_incorrect,
    incorrect_rate: `${(record.times_incorrect / record.times_answered) * 100}%`,
  }));

  return (
    <Table dataSource={weakDataTable}>
      <Column title='No' dataIndex='id' key='id' align='center' width={'5%'} />
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
      />
      <Column
        title='Incorrect Rate'
        dataIndex='incorrect_rate'
        key='incorrect_rate'
        align='center'
        width={'10%'}
      />
      <ColumnGroup title='Word1'>
        <Column title='Word' dataIndex='word1' key='word1' align='center' />
        <Column
          title='Sound'
          dataIndex='word1-sound'
          key='word1-sound'
          align='center'
          render={(_: any, record: TWeakTableData) => (
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
          render={(_: any, record: TWeakTableData) => (
            <a className='rounded-full' onClick={() => speakText(record.word2)}>
              <PlayCircleFilled style={{ fontSize: '1.5rem', color: '#2cb0c7' }} />
            </a>
          )}
        />
      </ColumnGroup>
    </Table>
  );
};

export default WeakWordsTable;
