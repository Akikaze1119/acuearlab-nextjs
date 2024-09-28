import Title from 'antd/es/typography/Title';
import { Tabs } from 'antd';
import { auth } from '@clerk/nextjs/server';
import { fetchRecords, fetchWeakRecords } from '@/lib/recordData';
import AuthError from '@/components/ui/AuthError';
import LineChart from '@/components/board/LineChart';
import BoardTable from '@/components/board/BoardTable';
import BarChart from '@/components/board/BarChart';
import WeakWordsTable from '@/components/board/WeakWordsTable';

const BoardContent = async () => {
  const { userId } = auth();
  if (!userId) {
    return <AuthError />;
  }
  const records = await fetchRecords(userId);
  const weakRecords = await fetchWeakRecords(userId);

  const TabItem1 = (
    <div className='h-full'>
      <div className='mb-16'>
        <LineChart records={records} />
      </div>
      <BoardTable records={records} />
    </div>
  );

  const TabItem2 = (
    <div className='h-full'>
      <div className='mb-16'>
        <BarChart weakRecords={weakRecords} />
      </div>
      <WeakWordsTable weakRecords={weakRecords} />
    </div>
  );

  const TabItems = [
    {
      key: '1',
      label: 'Latest Records',
      children: TabItem1,
    },
    {
      key: '2',
      label: 'Weakest Words',
      children: TabItem2,
    },
  ];

  return (
    <div className='px-1 mx-0 md:mx-10 mt-5'>
      <Title style={{ marginBottom: 16, color: '#2cb0c7', textAlign: 'center' }}>Records</Title>
      <Tabs defaultActiveKey='1' centered items={TabItems} size='large' />
    </div>
  );
};

export default BoardContent;
