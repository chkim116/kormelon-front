import { ReactNode } from 'react';
import { Box } from '@chakra-ui/react';

import { Navigation } from './Navigation';

interface LayoutsProps {
	children: ReactNode;
}

export const Layouts = ({ children }: LayoutsProps) => {
	return (
		<Box>
			<Navigation />
			<Box maxW='1440px' mx='auto' as='main'>
				{children}
			</Box>
		</Box>
	);
};
