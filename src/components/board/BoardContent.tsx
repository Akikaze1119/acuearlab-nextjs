import { auth } from '@clerk/nextjs/server';
import { fetchRecords } from '@/lib/recordData';
import AuthError from '@/components/ui/AuthError';
import BarChart from '@/components/board/BarChart';
import BoardTable from '@/components/board/BoardTable';

const BoardContent = async () => {
  const { userId } = auth();
  if (!userId) {
    return <AuthError />;
  }
  const records = await fetchRecords(userId);

  return (
    <div className='mx-4 flex flex-col gap-10 mt-5'>
      <h1 className='text-3xl font-bold text-primary text-center'>Records</h1>
      <BarChart records={records} />
      <BoardTable records={records} />
    </div>
  );
};

export default BoardContent;
