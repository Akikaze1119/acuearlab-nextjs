import { Layout } from 'antd';
import { CustomHeader } from '@/components/ui/Header';
import BoardContent from '@/components/board/BoardContent';

export default async function Game() {
  return (
    <div>
      <CustomHeader />
      <main className='mb-10'>
        <Layout>
          <BoardContent />
        </Layout>
      </main>
    </div>
  );
}
