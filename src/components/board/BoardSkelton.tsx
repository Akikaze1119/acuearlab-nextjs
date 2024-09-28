import { Skeleton } from 'antd';

const BoardSkelton = () => {
  return (
    <div className='mt-10 flex justify-center mx-auto'>
      <Skeleton active={true}>
        <article className='min-h-96 min-w-max'>
          <div className='h-96'></div>
        </article>
      </Skeleton>
    </div>
  );
};

export default BoardSkelton;
