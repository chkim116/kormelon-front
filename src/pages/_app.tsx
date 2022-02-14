import { useState } from 'react';
import type { AppProps } from 'next/app';
import styled from '@emotion/styled';
import dayJs from 'dayJs';
import 'dayJs/locale/ko';

import { Gnb } from 'src/components/Gnb';
import { GlobalStyle } from 'src/styles/globalStyle';
import { ThemeProvider } from '@emotion/react';
import { theme } from 'src/styles/theme';
import { Header } from 'src/components/Header';

// korean 시간
dayJs.locale('ko');

function MyApp({ Component, pageProps }: AppProps) {
	// ! 임시
	const [themeMode, setThemeMode] = useState<'dark' | 'light'>('dark');

	return (
		<ThemeProvider theme={theme(themeMode)}>
			<GlobalStyle theme={theme(themeMode)} />
			<AppStyle>
				<Gnb />
				<Header />

				<div className='main'>
					<button
						onClick={() =>
							setThemeMode((prev) => (prev === 'dark' ? 'light' : 'dark'))
						}
					>
						mode
					</button>
					<Component {...pageProps} />
				</div>
			</AppStyle>
		</ThemeProvider>
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
		max-width: 700px;
		margin: 0 auto;
		padding: 38px 10px;
	}
`;
