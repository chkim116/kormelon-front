import { ReactNode } from 'react';
import { useColorModeValue, Link } from '@chakra-ui/react';
import NextLink, { LinkProps } from 'next/link';

interface NavLinkProps extends Omit<LinkProps, 'href'> {
	children: ReactNode;
	to: string;
}

export const NavLink = ({ children, to, ...props }: NavLinkProps) => {
	const InitialColors = useColorModeValue('blackAlpha.700', 'whiteAlpha.700');
	const hoverColors = useColorModeValue('blackAlpha.900', 'whiteAlpha.900');

	return (
		<NextLink {...props} href={to}>
			<Link
				px={2}
				py={1}
				rounded={'md'}
				color={InitialColors}
				_hover={{
					textDecoration: 'none',
					color: hoverColors,
					transition: 'all .5s ease',
					'& svg': {
						color: hoverColors,
					},
				}}
			>
				{children}
			</Link>
		</NextLink>
	);
};
