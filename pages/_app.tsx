import { AppProps } from 'next/dist/shared/lib/router/router';
import styled from '@emotion/styled';
import '../styles/highlight.css';
import React, { createContext, useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import Layout from 'antd/lib/layout/layout';
import AppFooter from '../components/layouts/AppFooter';
import AppHeader from '../components/layouts/AppHeader';
import axios from 'axios';
import { initial, reducer } from '../reducer';
import { DefaultSeo } from 'next-seo';
import { useGlobalState } from '../hooks';
import AppTop from '../components/layouts/AppTop';
import Head from 'next/head';
import { ThemeProvider } from '@emotion/react';
import { theme } from '../styles/theme';
import router from 'next/router';
import AppLoading from '../components/layouts/AppLoading';
import { GlobalStyles } from '../styles/global';
import AppDarkMode from '../components/layouts/AppDarkMode';

const AppLayouts = styled(Layout)`
  width: 100%;
  background-color: ${({ theme }) => theme.white};
`;

axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? 'https://api.kormelon.com' : 'http://localhost:4000';
axios.defaults.withCredentials = true;

export const AppContext = createContext(initial);

function MyApp({ Component, pageProps }: AppProps) {
  const [isglobalLoading, setIsGlobalLoading] = useState(false);
  const [state] = useReducer(reducer, initial);
  const [view, setView] = useState({ views: 0, totalView: 0 });
  const [already, setAlready] = useState(false);
  const [isShowSider, setIsShowSider] = useGlobalState('isShowSider', false);
  // eslint-disable-next-line no-unused-vars
  const [_, setIsUser] = useGlobalState('auth', {
    username: '',
    token: '',
    id: '',
    admin: false,
  });
  const [mode, setMode] = useGlobalState('mode');
  const modeTheme = useMemo(() => {
    if (mode === 'dark') {
      return { ...theme, white: '#212729', black: '#fff' };
    } else {
      return { ...theme, white: '#fff', black: '#212729' };
    }
  }, [mode]);

  const handleLogout = () => {
    setIsUser({
      username: '',
      token: '',
      id: '',
      admin: false,
    });
  };

  const handleShowSider = useCallback(
    (e) => {
      e.stopPropagation();
      setIsShowSider(!isShowSider);
    },
    [isShowSider, setIsShowSider],
  );

  // const handleShowSider = useCallback((e) => {
  //   e.stopPropagation();
  //   dispatch({ type: 'SHOWING' });
  // }, []);

  useEffect(() => {
    if (state.showSider) {
      document.body.addEventListener('click', handleShowSider);
    }
    return () => {
      document.body.removeEventListener('click', handleShowSider);
    };
  }, [handleShowSider, state.showSider]);

  useEffect(() => {
    const getViews = async () => {
      await axios.post('/view').then((res) => {
        setView({
          views: res.data.views,
          totalView: res.data.totalView,
        });
        setAlready(true);
      });
    };
    const user = async () => await axios.get('/auth').then((res) => setIsUser(res.data));
    user();
    if (already) {
      return;
    }

    getViews();
  }, [already, setIsUser]);

  useEffect(() => {
    if (typeof window === 'object') {
      const modeOption = JSON.parse(localStorage.getItem('mode') || JSON.stringify('light'));
      if (modeOption) {
        setMode(modeOption);
      }
    }
    router.events.on('routeChangeStart', () => {
      setIsGlobalLoading(true);
    });
    router.events.on('routeChangeComplete', () => setIsGlobalLoading(false));
    router.events.on('routeChangeError', () => setIsGlobalLoading(false));

    return () => {
      router.events.off('routeChangeStart', () => {});
      router.events.off('routeChangeComplete', () => {});
      router.events.off('routeChangeError', () => {});
    };
  }, [setMode]);

  return (
    <>
      <DefaultSeo
        title={'Kormelon Devlog'}
        description={`가끔 생각날 적, 정리하고플 적 끄적이는 창고`}
        canonical="가끔 생각날 때 정리하는 블로그"
        openGraph={{
          article: {
            authors: ['김창회'],
          },
          title: 'Kormelon Devlog',
          description: '가끔 생각날 때 정리하는 블로그',
          type: 'blog',
          locale: 'ko_KR',
          url: 'https://www.kormelon.com/',
          site_name: 'Kormelon Devlog',
          images: [
            {
              url: `https://images.unsplash.com/photo-1616812757130-aca5451b0243?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`,
              alt: `Kormelon Devlog`,
            },
          ],
        }}
        twitter={{
          handle: '@handle',
          site: '@site',
          cardType: 'summary_large_image',
        }}
      />
      <Head>
        <link rel="apple-touch-icon" sizes="57x57" href="/favicons/apple-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/favicons/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/favicons/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/favicons/apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/favicons/apple-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/favicons/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/favicons/apple-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/favicons/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-icon-180x180.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/favicons/android-icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicons/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
        <link rel="manifest" href="/favicons/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/favicons/ms-icon-144x144.png" />
        <meta name="theme-color" content="#ffffff"></meta>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Code&family=Nanum+Myeongjo&family=Noto+Sans+KR&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.2.0/styles/a11y-dark.min.css"
        ></link>
        {process.env.NODE_ENV === 'production' && (
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3241811705564924"
            crossOrigin="anonymous"
          ></script>
        )}
      </Head>
      <ThemeProvider theme={modeTheme}>
        <GlobalStyles theme={modeTheme} />
        <AppContext.Provider value={state}>
          <AppLayouts>
            <>{isglobalLoading && <AppLoading scroll />}</>
            <AppHeader handleLogout={handleLogout} handleShowSider={handleShowSider} />
            <Component {...pageProps} />
            <AppFooter>
              <>
                <div>Kormelon &copy; 2021</div>
                <div>
                  <small>
                    Today <span>{view.views}</span>{' '}
                    <span>
                      Total <span>{view.totalView}</span>
                    </span>
                  </small>
                </div>
              </>
            </AppFooter>
          </AppLayouts>
          <AppDarkMode />
          <AppTop></AppTop>
        </AppContext.Provider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
