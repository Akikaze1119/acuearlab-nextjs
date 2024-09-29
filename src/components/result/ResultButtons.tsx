import { Button } from 'antd';
import { HistoryOutlined, PlayCircleOutlined } from '@ant-design/icons';

const ResultButtons = () => {
  return (
    <div className='flex justify-center gap-4 mt-6'>
      <Button type='primary' href='/game' size={'large'} style={{ fontSize: '1.1rem' }}>
        New Game
        <PlayCircleOutlined />
      </Button>
      <Button href='/board' size={'large'} style={{ fontSize: '1.1rem' }}>
        Record
        <HistoryOutlined />
      </Button>
    </div>
  );
};

export default ResultButtons;
