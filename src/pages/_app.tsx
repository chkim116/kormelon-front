import { DefaultSeo } from 'next-seo';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import { Layouts } from '@common/components/Layouts';
import { Chakra } from '@core/Chakra';
import { store } from '@common/store';
import defaultSEOConfig from '../../next-seo.config';

const MyApp = ({ Component, pageProps }: AppProps) => {
	return (
		<>
			<Head>
				<meta
					name='viewport'
					content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover'
				/>
			</Head>
			<DefaultSeo {...defaultSEOConfig} />
			<Chakra cookies={pageProps.cookies}>
				<Layouts>
					<Component {...pageProps} />
				</Layouts>
			</Chakra>
		</>
	);
};

export default store.withRedux(MyApp);
