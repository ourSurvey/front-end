import { global } from 'styles/global';
import { Global } from '@emotion/react';
import { RecoilRoot } from 'recoil';
import { ReactElement, ReactNode, useState } from 'react';
import type { AppProps } from 'next/app';
import Layout from 'components/Layout';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { NextPage } from 'next';
import DebugObserver from 'components/common/DebugObserver';
import Head from 'next/head';
import { useEffect } from 'react';
type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

declare global {
  interface Window {
    Kakao: any;
  }
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const [queryClient] = useState(() => new QueryClient());

  // useEffect(() => {
  //   if (window.Kakao) {
  //     const kakao = window.Kakao;

  //     if (!kakao.isInitialized()) {
  //       window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO);
  //     }
  //   }
  // }, []);

  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <RecoilRoot>
          {/* <DebugObserver /> */}
          <Global styles={global} />
          <Head>
            <title>Our-Survey - 설문하는 사람들의 품앗이 공간</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          {getLayout(<Component {...pageProps} />)}
        </RecoilRoot>
      </Hydrate>
    </QueryClientProvider>
  );
}
