import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta name="google-site-verification" content="7RYJ0wuUw2CvBgx03RveUFDeeCfoqRZNBSfTYnSabx8" />
        </Head>
        <body>
          <Main />
          <NextScript></NextScript>
        </body>
      </Html>
    );
  }
}
