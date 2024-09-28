import { Flex } from 'antd';
import { speakText } from '@/lib/speakText';
import { PlayCircleFilled } from '@ant-design/icons';

const WordColumnRender = ({ word }: { word: string }) => {
  return (
    <Flex style={{ gap: '1.2rem' }}>
      <PlayCircleFilled
        style={{ fontSize: '1.2rem', color: '#2cb0c7' }}
        onClick={() => speakText(word)}
      />
      <span>{word}</span>
    </Flex>
  );
};

export default WordColumnRender;
