import { auth } from '@clerk/nextjs/server';
import { fetchRecords } from '@/lib/recordData';
import AuthError from '@/components/ui/AuthError';
import BoardTable from './BoardTable';

const BoardContent = async () => {
  const { userId } = auth();
  if (!userId) {
    return <AuthError />;
  }
  const records = await fetchRecords(userId);

  return (
    <div className='mx-4'>
      <h1 className='text-2xl font-bold'>Records</h1>
      <BoardTable records={records} />
    </div>
  );
};

export default BoardContent;
