import { ReactNode } from 'react';
import { Box } from '@chakra-ui/react';

import { Header } from './Header';
import { Footer } from './Footer';

interface LayoutsProps {
	children: ReactNode;
}

export const Layouts = ({ children }: LayoutsProps) => {
	return (
		<Box>
			<Header />
			<Box maxW='1440px' mx='auto' as='main'>
				{children}
			</Box>
			<Footer />
		</Box>
	);
};
