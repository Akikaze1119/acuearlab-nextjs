import ResultContent from '@/components/result/ResultContent';
import { CustomHeader } from '@/components/ui/Header';
import { Layout } from 'antd';

const Result = () => {
  return (
    <div>
      <CustomHeader />
      <main>
        <Layout>
          <ResultContent />
        </Layout>
      </main>
    </div>
  );
};

export default Result;
