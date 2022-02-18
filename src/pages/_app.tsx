import { FC, useEffect } from 'react';
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import styled from '@emotion/styled';
import dayJs from 'dayJs';
import 'dayJs/locale/ko';

import { Gnb } from 'src/components/Gnb';
import { GlobalStyle } from 'src/styles/globalStyle';
import { ThemeProvider } from '@emotion/react';
import { theme } from 'src/styles/theme';
import { Header } from 'src/components/Header';
import store, { useAppSelector } from 'src/store/config';

/**
 * atom-one-dark theme
 * @see https://github.com/highlightjs/highlight.js/blob/main/src/styles/atom-one-dark.css
 */
import 'src/styles/hljs.atom.css';

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

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<AppTheme>
				<AppStyle>
					<Gnb />
					<Header />
					<div className='main'>
						<Component {...pageProps} />
					</div>
				</AppStyle>
			</AppTheme>
		</Provider>
	);
}

export default MyApp;

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
