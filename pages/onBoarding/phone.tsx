import type { NextPage } from 'next';
import InsertPhoneNumber from 'components/onBoarding/InsertPhoneNumber';
import Layout from 'components/onBoarding/Layout';

const Phone: NextPage = () => {
  return (
    <Layout>
      <InsertPhoneNumber />
    </Layout>
  );
};

export default Phone;
