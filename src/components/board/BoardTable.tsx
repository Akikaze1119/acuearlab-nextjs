'use client';
import { TBoardData } from '@/lib/definitions';
import { speakText } from '@/lib/speakText';
import { CheckOutlined, CloseOutlined, PlayCircleFilled } from '@ant-design/icons';
import { Flex, Table, TableColumnsType } from 'antd';
import { convertUTCToLocal } from '@/lib/convertUTCToLocal';

interface BoardTableProps {
  records: TBoardData[];
}

interface ExpandedDataType {
  quiz_id: number;
  word1: string;
  word2: string;
  isCorrect: boolean;
}

interface DataType {
  key: number;
  score: number;
  created_at: string;
}

const BoardTable = ({ records }: BoardTableProps) => {
  const dataSources: DataType[] = records.map((record, index) => ({
    key: index + 1,
    name: `Record${record.id}`,
    score: record.result.filter((item) => item.isCorrect === true).length,
    created_at: convertUTCToLocal(record.created_at),
  }));

  const expandDataSources: Record<number, ExpandedDataType[]> = {};
  records.forEach((record, index) => {
    expandDataSources[index + 1] = record.result.map((item: ExpandedDataType) => ({
      key: item.quiz_id,
      quiz_id: item.quiz_id,
      word1: item.word1,
      word2: item.word2,
      isCorrect: item.isCorrect,
    }));
  });

  const expandColumns: TableColumnsType<ExpandedDataType> = [
    {
      title: 'Word1',
      dataIndex: 'word1',
      key: 'word1',
      render: (_: any, record: ExpandedDataType) => (
        <Flex
          style={{ paddingLeft: '1.5rem', paddingRight: '1.5rem' }}
          justify={'space-between'}
          align={'center'}
        >
          <span>{record.word1}</span>
          <PlayCircleFilled
            style={{ fontSize: '1.2rem', color: '#2cb0c7' }}
            onClick={() => speakText(record.word1)}
          />
        </Flex>
      ),
    },
    {
      title: 'Word2',
      dataIndex: 'word2',
      key: 'word2',
      render: (_: any, record: ExpandedDataType) => (
        <Flex
          style={{ paddingLeft: '1.5rem', paddingRight: '1.5rem' }}
          justify={'space-between'}
          align={'center'}
        >
          <span>{record.word2}</span>
          <PlayCircleFilled
            style={{ fontSize: '1.2rem', color: '#2cb0c7' }}
            onClick={() => speakText(record.word2)}
          />
        </Flex>
      ),
    },
    {
      title: 'Result',
      dataIndex: 'isCorrect',
      key: 'result',
      align: 'center',
      render: (_: any, record: ExpandedDataType) => {
        return record.isCorrect ? (
          <CheckOutlined style={{ color: '#52c41a' }} />
        ) : (
          <CloseOutlined style={{ color: '#f5222d' }} />
        );
      },
    },
  ];

  const columns: TableColumnsType<DataType> = [
    { title: 'Record', dataIndex: 'name', key: 'name', sorter: (a, b) => a.score - b.score },
    { title: 'Play Date', dataIndex: 'created_at', key: 'created_at' },
    { title: 'Score', dataIndex: 'score', key: 'score', sorter: (a, b) => a.score - b.score },
  ];

  const expandedRowRender = (record: DataType) => (
    <Table<ExpandedDataType>
      columns={expandColumns}
      dataSource={expandDataSources[record.key]}
      pagination={false}
    />
  );

  return (
    <div className='h-full'>
      <Table<DataType>
        columns={columns}
        expandable={{ expandedRowRender, defaultExpandedRowKeys: [1] }}
        dataSource={dataSources}
        pagination={{ position: ['topRight'] }}
        scroll={{ x: 'max-content' }}
      />
    </div>
  );
};

export default BoardTable;
