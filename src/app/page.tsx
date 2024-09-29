import ContentButtons from '@/components/index/ContentButtons';
import { FlipWords } from '@/components/ui/flip-words';
import { CustomHeader } from '@/components/ui/Header';

export default function Home() {
  const words = ['r', 'l'];
  return (
    <div>
      <CustomHeader />
      <main className='flex justify-center items-center h-full'>
        <div className='text-center text-neutral-600 dark:text-neutral-400'>
          <h1 className='text-2xl md:text-4xl font-bold mb-8 mt-14'>
            Welcome to <span className='text-primary'>AcuEarLab</span>
          </h1>

          <div className='text-8xl mx-auto mb-12 font-normal text-neutral-600 dark:text-neutral-400'>
            <FlipWords words={words} className='w-10 font-semibold' />
            <span>aw?</span>
          </div>
          <p className='text-lg md:text-xl mb-10'>
            Let's test distinguish sounds between similar sounds accurately!
          </p>
          <ContentButtons />
        </div>
      </main>
    </div>
  );
}
