import type { NextPage } from 'next';
import Layout from 'components/onBoarding/Layout';
import SelectGengder from 'components/onBoarding/SelectGengder';

const index: NextPage = () => {
  return (
    <Layout>
      <SelectGengder />
    </Layout>
  );
};

export default index;
