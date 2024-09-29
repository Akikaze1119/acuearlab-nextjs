import { Layout } from 'antd';
import { CustomHeader } from '@/components/ui/Header';
import BoardContent from '@/components/board/BoardContent';
import { Suspense } from 'react';
import BoardSkelton from '@/components/board/BoardSkelton';

export default async function Game() {
  return (
    <div>
      <CustomHeader />
      <main className='mb-10'>
        <Layout>
          <Suspense fallback={<BoardSkelton />}>
            <BoardContent />
          </Suspense>
        </Layout>
      </main>
    </div>
  );
}
