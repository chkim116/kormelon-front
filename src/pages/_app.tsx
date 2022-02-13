import styled from '@emotion/styled';
import { Gnb } from 'src/components/Gnb';
import { GlobalStyle } from 'src/styles/globalStyle';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<GlobalStyle />
			<AppStyle>
				<Gnb />

				<div className='main'>
					<Component {...pageProps} />
				</div>
			</AppStyle>
		</>
	);
}

export default MyApp;

const AppStyle = styled.div`
	width: 100%;
	min-height: 100vh;
	display: flex;

	.main {
		width: 100%;
	}
`;
