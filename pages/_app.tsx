/** @jsxImportSource @emotion/react */
import { global } from "styles/global";
import { Global } from "@emotion/react";
import { RecoilRoot } from "recoil";
import { useState } from "react";
import type { AppProps } from "next/app";
import Layout from "components/Layout";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Layout>
            <>
              <Global styles={global} />
              <Component {...pageProps} />
            </>
          </Layout>
        </Hydrate>
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default MyApp;
