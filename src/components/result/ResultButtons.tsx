import { Button } from 'antd';
import { HistoryOutlined, HomeOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { SignedIn, SignedOut } from '@clerk/nextjs';

const ResultButtons = () => {
  return (
    <div className='flex justify-center gap-4 mt-6'>
      <Button type='primary' href='/game' size={'large'} style={{ fontSize: '1.1rem' }}>
        New Game
        <PlayCircleOutlined />
      </Button>
      <SignedIn>
        <Button href='/board' size={'large'} style={{ fontSize: '1.1rem' }}>
          Record
          <HistoryOutlined />
        </Button>
      </SignedIn>
      <SignedOut>
        <Button href='/' size={'large'} style={{ fontSize: '1.1rem' }}>
          Home
          <HomeOutlined />
        </Button>
      </SignedOut>
    </div>
  );
};

export default ResultButtons;
