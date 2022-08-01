import { Global } from "@emotion/react";
import type { AppProps } from "next/app";
import { global } from "styles/global";
import Layout from "components/Layout";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <>
        <Global styles={global} />
        <Component {...pageProps} />
      </>
    </Layout>
  );
}

export default MyApp;
