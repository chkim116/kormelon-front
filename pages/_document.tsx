import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta name="google-site-verification" content="3yQnN4a3laP_8uJlbw0p-c0XNOQlISHhCfBdGfGTq4w" />
        </Head>
        <body>
          <Main />
          <NextScript></NextScript>
        </body>
      </Html>
    );
  }
}
