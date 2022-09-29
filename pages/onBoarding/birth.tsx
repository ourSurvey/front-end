import type { NextPage } from 'next';
import Layout from 'components/onBoarding/Layout';
import InsertBitrhYear from 'components/onBoarding/InsertBitrhYear';

const Birth: NextPage = () => {
  return (
    <Layout>
      <InsertBitrhYear />
    </Layout>
  );
};

export default Birth;
