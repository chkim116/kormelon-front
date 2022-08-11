import type { ReactNode } from 'react';
import { Container } from '@chakra-ui/react';

interface SectionProps {
	children?: ReactNode;
}

export const Section = ({ children }: SectionProps) => {
	return (
		<Container
			maxW='1280px'
			mx='auto'
			as='section'
			py={{ base: 10, md: 24, lg: 36 }}
		>
			{children}
		</Container>
	);
};
