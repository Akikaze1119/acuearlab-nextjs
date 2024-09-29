'use client';
import { Suspense, useState } from 'react';
import { Button, Flex } from 'antd';
import { SignInButton, SignedIn, SignedOut } from '@clerk/nextjs';
import SignedOutSkelton from '@/components/index/SignedOutSkelton';
import IndexPageModal from './Modal';

const ContentButtons = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <IndexPageModal open={isModalOpen} setOpen={setIsModalOpen} />
      <SignedOut>
        <Flex gap='middle' justify='center'>
          <Suspense fallback={<SignedOutSkelton />}>
            <SignInButton>
              <Button
                type='primary'
                size='large'
                style={{ fontSize: '1.25rem', padding: '1.5rem' }}
              >
                Sign in
              </Button>
            </SignInButton>
          </Suspense>

          <Button
            type='default'
            size='large'
            onClick={showModal}
            style={{ fontSize: '1.25rem', padding: '1.5rem' }}
          >
            Play a Demo
          </Button>
        </Flex>
      </SignedOut>
      <SignedIn>
        <Flex gap='middle' justify='center'>
          <Button
            type='primary'
            size='large'
            href='/game'
            style={{ fontSize: '1.25rem', padding: '1.5rem' }}
          >
            Start Game
          </Button>
          <Button
            type='default'
            size='large'
            href='/board'
            style={{ fontSize: '1.25rem', padding: '1.5rem' }}
          >
            View Records
          </Button>
        </Flex>
      </SignedIn>
    </>
  );
};
export default ContentButtons;
