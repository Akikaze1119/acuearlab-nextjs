'use client';

import { useRouter } from 'next/navigation';
import { Button } from 'antd';
import { HistoryOutlined, ReloadOutlined } from '@ant-design/icons';

const ResultButtons = () => {
  const router = useRouter();

  return (
    <div className='flex justify-center gap-4 mt-6'>
      <Button type='primary' onClick={() => router.push('/game')}>
        Play again
        <ReloadOutlined />
      </Button>
      <Button onClick={() => router.push('/board')}>
        Record
        <HistoryOutlined />
      </Button>
    </div>
  );
};

export default ResultButtons;
