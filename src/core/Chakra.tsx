import type { ReactNode } from 'react';
import {
	ChakraProvider,
	cookieStorageManagerSSR,
	localStorageManager,
} from '@chakra-ui/react';
import { GetServerSidePropsContext } from 'next';

interface ChakraProps {
	cookies: string;
	children: ReactNode;
}

export function Chakra({ cookies, children }: ChakraProps) {
	const colorModeManager =
		typeof cookies === 'string'
			? cookieStorageManagerSSR(cookies)
			: localStorageManager;

	return (
		<ChakraProvider colorModeManager={colorModeManager}>
			{children}
		</ChakraProvider>
	);
}

export function getServerSideProps({ req }: GetServerSidePropsContext) {
	return {
		props: {
			cookies: req.headers.cookie ?? '',
		},
	};
}
