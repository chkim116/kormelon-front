import { AppProps } from 'next/dist/shared/lib/router/router';
import '../styles/highlight.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AppTop from '../components/layouts/AppTop';
import Head from 'next/head';
import router from 'next/router';
import AppDarkMode from '../components/layouts/AppDarkMode';
import { pageview } from '../lib/gtag';
import { Provider } from 'react-redux';
import store from '../store';
import AppLayouts from '../components/layouts/AppLayouts';
import AppLoading from '../components/layouts/AppLoading';
import head from '../assets/head';
import AppHeader from '../components/layouts/AppHeader';
import AppFooter from '../components/layouts/AppFooter';

axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? 'https://api.kormelon.com' : 'http://localhost:4000';
axios.defaults.withCredentials = true;

function MyApp({ Component, pageProps }: AppProps) {
  const [isglobalLoading, setIsGlobalLoading] = useState(false);

  useEffect(() => {
    // gtags
    const gtagRouteChange = (url: string) => {
      pageview(url);
    };

    router.events.on('routeChangeStart', () => {
      setIsGlobalLoading(true);
    });
    router.events.on('routeChangeComplete', (url) => {
      gtagRouteChange(url);
      setIsGlobalLoading(false);
    });
    router.events.on('routeChangeError', () => setIsGlobalLoading(false));

    return () => {
      router.events.off('routeChangeStart', () => {});
      router.events.off('routeChangeComplete', gtagRouteChange);
      router.events.off('routeChangeError', () => {});
    };
  }, []);

  return (
    <>
      {head.defaultSEO()}
      <Head>
        {head.favicon()}
        {head.googleConsole()}
      </Head>
      <Provider store={store}>
        <AppDarkMode>
          {isglobalLoading && <AppLoading scroll />}
          <AppHeader />
          <AppLayouts>
            <Component {...pageProps} />
          </AppLayouts>
          <AppTop></AppTop>
          <AppFooter />
        </AppDarkMode>
      </Provider>
    </>
  );
}

export default MyApp;
