import { FC, useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import styled from '@emotion/styled';
import dayJs from 'dayjs';
import 'dayjs/locale/ko';
import { ReactNotifications } from 'react-notifications-component';
import { ThemeProvider, useTheme } from '@emotion/react';
import ReactLoading from 'react-loading';

import { Gnb } from 'src/components/Gnb';
import { GlobalStyle } from 'src/styles/globalStyle';
import { theme } from 'src/styles/theme';
import { Header } from 'src/components/Header';
import { Footer } from 'src/components/Footer';
import store, { useAppDispatch, useAppSelector } from 'src/store/config';

import 'react-notifications-component/dist/theme.css';
/**
 * atom-one-dark theme
 * @see https://github.com/highlightjs/highlight.js/blob/main/src/styles/atom-one-dark.css
 */
import 'src/styles/hljs.atom.css';
import { getUser } from 'src/store/user';
import { getView } from 'src/store/view';
import { useRouter } from 'next/router';
import { pageView } from 'src/lib/gtagConfig';
import Notifications from 'src/components/Notifications';
import DefaultSeo from 'src/lib/seo/DefaultSeo';
import Head from 'next/head';

// korean 시간
dayJs.locale('ko');

// theme, global style 적용
const AppTheme: FC = ({ children }) => {
	const { themeMode } = useAppSelector((state) => state.themeMode);

	useEffect(() => {
		document.body.style.transition = 'all 300ms';

		return () => {
			document.body.style.transition = '';
		};
	}, [themeMode]);

	return (
		<ThemeProvider theme={theme(themeMode)}>
			<GlobalStyle theme={theme(themeMode)} />
			{children}
		</ThemeProvider>
	);
};

const View = () => {
	const dispatch = useAppDispatch();
	const { pathname } = useRouter();
	const { isView } = useAppSelector((state) => state.view);

	useEffect(() => {
		if (isView) return;

		dispatch(getView());
	}, [dispatch, isView, pathname]);

	return null;
};

const Auth = () => {
	const dispatch = useAppDispatch();
	const { userData } = useAppSelector((state) => state.user);

	useEffect(() => {
		if (userData) {
			return;
		}
		dispatch(getUser());
	}, [dispatch, userData]);

	return null;
};

const GlobalLoading = () => {
	const theme = useTheme();

	return (
		<ReactLoading
			type='spin'
			color={theme.colors.onPrimary}
			className='loader'
		/>
	);
};

function MyApp({ Component, pageProps }: AppProps) {
	const router = useRouter();
	const [isGlobalLoading, setIsGlobalLoading] = useState(false);

	useEffect(() => {
		const onRouteChangeStart = () => {
			setIsGlobalLoading(true);
		};

		const onRouteChangeComplete = (url: string) => {
			setIsGlobalLoading(false);

			// gtags
			pageView(url);
		};

		const onRouteChangeError = () => {
			setIsGlobalLoading(false);
		};

		router.events.on('routeChangeStart', onRouteChangeStart);
		router.events.on('routeChangeComplete', onRouteChangeComplete);
		router.events.on('routeChangeError', onRouteChangeError);

		return () => {
			router.events.off('routeChangeStart', onRouteChangeStart);
			router.events.off('routeChangeComplete', onRouteChangeComplete);
			router.events.off('routeChangeError', onRouteChangeError);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			{/* SEO */}
			<DefaultSeo />
			<Head>
				{/* google webconsole */}
				<meta
					name='google-site-verification'
					content='0sCrJ0gEiQY8ypglxoB_nZ2vgIIWS_q9kwXF_8spzOc'
				/>

				{/* favicon */}
				<link
					rel='apple-touch-icon'
					sizes='57x57'
					href='/favicons/apple-icon-57x57.png'
				/>
				<link
					rel='apple-touch-icon'
					sizes='60x60'
					href='/favicons/apple-icon-60x60.png'
				/>
				<link
					rel='apple-touch-icon'
					sizes='72x72'
					href='/favicons/apple-icon-72x72.png'
				/>
				<link
					rel='apple-touch-icon'
					sizes='76x76'
					href='/favicons/apple-icon-76x76.png'
				/>
				<link
					rel='apple-touch-icon'
					sizes='114x114'
					href='/favicons/apple-icon-114x114.png'
				/>
				<link
					rel='apple-touch-icon'
					sizes='120x120'
					href='/favicons/apple-icon-120x120.png'
				/>
				<link
					rel='apple-touch-icon'
					sizes='144x144'
					href='/favicons/apple-icon-144x144.png'
				/>
				<link
					rel='apple-touch-icon'
					sizes='152x152'
					href='/favicons/apple-icon-152x152.png'
				/>
				<link
					rel='apple-touch-icon'
					sizes='180x180'
					href='/favicons/apple-icon-180x180.png'
				/>
				<link
					rel='icon'
					type='image/png'
					sizes='192x192'
					href='/favicons/android-icon-192x192.png'
				/>
				<link
					rel='icon'
					type='image/png'
					sizes='32x32'
					href='/favicons/favicon-32x32.png'
				/>
				<link
					rel='icon'
					type='image/png'
					sizes='96x96'
					href='/favicons/favicon-96x96.png'
				/>
				<link
					rel='icon'
					type='image/png'
					sizes='16x16'
					href='/favicons/favicon-16x16.png'
				/>
				<link rel='manifest' href='/favicons/manifest.json' />
				<meta name='msapplication-TileColor' content='#ffffff' />
				<meta
					name='msapplication-TileImage'
					content='/favicons/ms-icon-144x144.png'
				/>
				<meta name='theme-color' content='#ffffff' />
			</Head>

			<AppTheme>
				<View />
				<Auth />
				<AppStyle>
					{isGlobalLoading && <GlobalLoading />}
					<ReactNotifications />
					<Gnb />
					<Header />
					<main>
						<Component {...pageProps} />
					</main>
					<Footer />
					<Notifications />
				</AppStyle>
			</AppTheme>
		</>
	);
}

export default store.withRedux(MyApp);

const AppStyle = styled.div`
	width: 100%;
	/* header height만큼 제거 */
	min-height: calc(100vh - 50px);
	display: flex;
	flex-direction: column;
	background-color: ${({ theme }) => theme.colors.primary};

	/* 로딩바 */
	.loader {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

		svg {
			width: 40px;
			height: 40px;
		}
	}

	main {
		width: 100%;
		max-width: 1000px;
		min-height: calc(100vh - 50px);
		margin: 0 auto;
		padding: 38px 10px;
	}
`;
