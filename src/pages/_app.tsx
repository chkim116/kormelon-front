import { FC, useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import styled from '@emotion/styled';
import dayJs from 'dayJs';
import 'dayJs/locale/ko';
import { ReactNotifications } from 'react-notifications-component';

import { Gnb } from 'src/components/Gnb';
import { GlobalStyle } from 'src/styles/globalStyle';
import { ThemeProvider } from '@emotion/react';
import { theme } from 'src/styles/theme';
import { Header } from 'src/components/Header';
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
import { pageview } from 'src/lib/gtagConfig';

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

	useEffect(() => {
		dispatch(getView());
	}, [dispatch, getView]);

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

function MyApp({ Component, pageProps }: AppProps) {
	const router = useRouter();
	const [isGlobalLoading, setIsGlobalLoading] = useState(false);

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
		<AppTheme>
			{/* {isGlobalLoading && <Loading />} */}
			<View />
			<Auth />
			<AppStyle>
				<ReactNotifications />
				<Gnb />
				<Header />
				<div className='main'>
					<Component {...pageProps} />
				</div>
			</AppStyle>
		</AppTheme>
	);
}

export default store.withRedux(MyApp);

const AppStyle = styled.div`
	width: 100%;
	/* header height만큼 제거 */
	min-height: calc(100vh - 50px);
	display: flex;
	background-color: ${({ theme }) => theme.colors.primary};

	.main {
		width: 100%;
		max-width: 1000px;
		margin: 0 auto;
		padding: 38px 10px;
	}
`;
