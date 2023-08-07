import type { ReactElement, ReactNode } from 'react';
import React, { useState, useEffect } from 'react';
import { Global } from '@emotion/react';
import { type NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import Layout from 'components/Layout';
import { global } from 'styles/global';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (window.Kakao) {
      const kakao = window.Kakao;

      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (!kakao.isInitialized()) {
        window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO);
      }
    }
  }, []);

  const getLayout = Component.getLayout ?? ((page: React.ReactElement) => <Layout>{page}</Layout>);

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
