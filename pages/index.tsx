import type { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
// import { GetServerSideProps } from "next";
// import { withAuth } from "utills/isLoggedIn";

// export const getServerSideProps: GetServerSideProps = withAuth(() => {
//   return {
//     props: {},
//   };
// });

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>Our-Survey</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>홈 페이지 입니다</div>
    </div>
  );
};

export default Home;
