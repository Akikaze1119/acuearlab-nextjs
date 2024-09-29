'use client';
import { Skeleton } from 'antd';

const SignedOutSkelton = () => {
  return (
    <>
      <Skeleton.Button active shape='round' />
    </>
  );
};

export default SignedOutSkelton;
