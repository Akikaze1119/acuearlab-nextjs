import { auth } from '@clerk/nextjs/server';
import { fetchRecords } from '@/lib/recordData';
import AuthError from '@/components/ui/AuthError';
import BarChart from '@/components/board/BarChart';
import BoardTable from '@/components/board/BoardTable';
import Title from 'antd/es/typography/Title';
import { Tabs } from 'antd';

const BoardContent = async () => {
  const { userId } = auth();
  if (!userId) {
    return <AuthError />;
  }
  const records = await fetchRecords(userId);

  const TabItem1 = (
    <>
      <div className='mb-16'>
        <BarChart records={records} />
      </div>
      <BoardTable records={records} />
    </>
  );

  const TabItem2 = (
    <div>
      <p>Tab 2 Content</p>
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
    <div className='mx-4 mt-5'>
      <Title style={{ marginBottom: 16, color: '#2cb0c7', textAlign: 'center' }}>Records</Title>
      <Tabs defaultActiveKey='1' centered items={TabItems} size='large' />
    </div>
  );
};

export default BoardContent;
