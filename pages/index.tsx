import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import TokenProvider from "services/TokenProvider";
import Head from "next/head";
import dynamic from "next/dynamic";
import NavBar from "components/common/NavBar";

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

      <NavBar />
    </div>
  );
};

export default Home;
