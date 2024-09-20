import { ConfigProvider } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { SignedIn, UserButton } from '@clerk/nextjs';

export const CustomHeader = () => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            headerBg: '#fff',
          },
        },
      }}
    >
      <Header className='flex justify-between'>
        <div className='h-full flex items-center'>
          <a href='/' className='flex items-center'>
            <img className='w-12 h-12' src='./acuearlab-logo.png' alt='AcuEarLab Logo' />
            <span className='text-2xl text-neutral-700 dark:text-white font-bold'>AcuEarLab</span>
          </a>
        </div>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </Header>
    </ConfigProvider>
  );
};
