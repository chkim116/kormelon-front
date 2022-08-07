import Head from 'next/head';
import { DefaultSeo } from 'next-seo';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';

import defaultSEOConfig from '../../next-seo.config';

const MyApp = ({ Component, pageProps }: AppProps) => {
	return (
		<ChakraProvider>
			<Head>
				<meta
					name='viewport'
					content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover'
				/>
			</Head>
			<DefaultSeo {...defaultSEOConfig} />
			<Component {...pageProps} />
		</ChakraProvider>
	);
};

export default MyApp;
