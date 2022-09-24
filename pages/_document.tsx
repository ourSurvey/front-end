import Document, { Html, Main, NextScript, Head } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet" />
        </Head>
        <body>
          <div id="portal" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
