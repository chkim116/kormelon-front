import { AppProps } from 'next/dist/next-server/lib/router/router';
import styled from '@emotion/styled';
import '../styles/index.css';
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

const AppLayouts = styled(Layout)`
  width: 100%;
  background-color: #ffffff;
`;

axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? 'https://api.kormelon.com' : 'http://localhost:4000';
axios.defaults.withCredentials = true;

export const AppContext = createContext(initial);

function MyApp({ Component, pageProps, user }: AppProps) {
  const [state, dispatch] = useReducer(reducer, initial);
  const [view, setView] = useState({ views: 0, totalView: 0 });
  const [already, setAlready] = useState(false);
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

  const handleShowSider = useCallback(() => {
    dispatch({ type: 'SHOWING' });
  }, []);

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

  useScrollTop();

  return (
    <>
      <DefaultSeo
        // TODO: 이미지 태그 추가하기!!
        openGraph={{
          title: '개발자의 생각창고',
          description: '개발은 즐겁게',
          type: 'blog',
          locale: 'ko_KR',
          url: 'https://www.kormelon.com/',
          site_name: '생각창고',
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
      </Head>
      <AppContext.Provider value={state}>
        <div
          style={{
            position: 'fixed',
            left: 0,
            zIndex: 999,
            fontSize: 8,
          }}
        >
          Today{view.views} <span>Total{view.totalView}</span>
        </div>
        <AppLayouts>
          <AppHeader handleLogout={handleLogout} handleShowSider={handleShowSider} showSider={state.showSider} />
          <Component {...pageProps} />
          <AppFooter>
            <div>KimChanghoe &copy; 2021</div>
          </AppFooter>
        </AppLayouts>
        <AppTop></AppTop>
      </AppContext.Provider>
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
