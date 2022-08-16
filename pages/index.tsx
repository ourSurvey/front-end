import type { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import SearchHeader from "components/common/SearchHeader";

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>Our-Survey</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <SearchHeader name="실시간 서베이" hasBack={true} /> */}
      <div>홈 페이지 입니다</div>
    </div>
  );
};

export default Home;
