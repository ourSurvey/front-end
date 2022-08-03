import { Global } from "@emotion/react";
import { useState } from "react";
import type { AppProps } from "next/app";
import { global } from "styles/global";
import Layout from "components/Layout";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import TokenProvider from "services/TokenProvider";
function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  const router = useRouter();

  useEffect(() => {
    const moveLoginPage = (): void => {
      if (!TokenProvider.has("accessToken")) {
        router.push("/login");
      }
    };
    moveLoginPage();
  }, []);
  return (
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
  );
}

export default MyApp;
