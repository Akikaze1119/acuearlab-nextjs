'use client';
import { Layout, Skeleton } from 'antd';

const BoardSkelton = () => {
  const { Content } = Layout;
  return (
    <Layout>
      <Content style={{ margin: '1.2rem auto' }}>
        <Skeleton active={true}></Skeleton>
      </Content>
    </Layout>
  );
};

export default BoardSkelton;
