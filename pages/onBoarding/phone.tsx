import type { NextPage } from "next";
import Layout from "components/onBoarding/Layout";
import InsertPhoneNumber from "components/onBoarding/InsertPhoneNumber";

const Phone: NextPage = () => {
  return (
    <Layout>
      <InsertPhoneNumber />
    </Layout>
  );
};

export default Phone;
