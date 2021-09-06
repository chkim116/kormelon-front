import { AppProps } from 'next/dist/next-server/lib/router/router';
import styled from '@emotion/styled';
import '../styles/index.css';
import '../styles/highlight.css';
import '../styles/content.css';
import React, { createContext, useCallback, useEffect, useReducer, useState } from 'react';
import Layout from 'antd/lib/layout/layout';
import AppFooter from '../components/layouts/AppFooter';
import AppHeader from '../components/layouts/AppHeader';
import axios from 'axios';
import { initial, reducer } from '../reducer';
import { DefaultSeo } from 'next-seo';
import { useGlobalState, useScrollTop } from '../hooks';
import AppTop from '../components/layouts/AppTop';
import Head from 'next/head';
import { ThemeProvider } from '@emotion/react';
import { theme } from '../styles/theme';
import router from 'next/router';
import AppLoading from '../components/layouts/AppLoading';

const AppLayouts = styled(Layout)`
  width: 100%;
  background-color: #ffffff;
`;

axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? 'https://api.kormelon.com' : 'http://localhost:4000';
axios.defaults.withCredentials = true;

export const AppContext = createContext(initial);

function MyApp({ Component, pageProps, user }: AppProps) {
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
  }, [state.showSider]);

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
    if (already) {
      return;
    }
    getViews();
  }, []);

  useEffect(() => {
    if (user?.id) {
      setIsUser(user);
    }
  }, [user]);

  useEffect(() => {
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
  }, []);

  useScrollTop();

  return (
    <>
      <DefaultSeo
        title={'김개발 블로그'}
        description={`가끔 생각날 적, 정리하고플 적 끄적이는 창고`}
        canonical="https://www.kormelon.com/"
        openGraph={{
          title: '김개발 블로그',
          description: '가끔 생각날 적, 정리하고플 적 끄적이는 창고',
          type: 'blog',
          locale: 'ko_KR',
          url: 'https://www.kormelon.com/',
          site_name: '김개발 블로그',
          images: [
            {
              url: `https://images.unsplash.com/photo-1616812757130-aca5451b0243?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`,
              alt: `김개발 블로그`,
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
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/monokai-sublime.min.css"
        />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js"></script>
        {process.env.NODE_ENV === 'production' && (
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3241811705564924"
            crossOrigin="anonymous"
          ></script>
        )}
      </Head>
      <ThemeProvider theme={theme}>
        <AppContext.Provider value={state}>
          <AppLayouts>
            <>{isglobalLoading && <AppLoading scroll />}</>;
            <AppHeader handleLogout={handleLogout} handleShowSider={handleShowSider} />
            <Component {...pageProps} />
            <AppFooter>
              <>
                <div>KimChanghoe &copy; 2021</div>
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
          <AppTop></AppTop>
        </AppContext.Provider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;

MyApp.getInitialProps = async (app: any) => {
  const request = app.ctx?.req;

  let cookie = '';
  if (request) {
    cookie = request.headers.cookie || '';
  }

  const user = await axios
    .get('/auth', {
      headers: {
        cookie: cookie,
      },
    })
    .then((res) => res.data);

  return { user };
};
