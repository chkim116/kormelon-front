import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import Link from 'next/link';

import { NavLinkMenu } from './NavLinkMenu';
import { UserMenu } from './UserMenu';

export const Navigation = () => {
	return (
		<Box px={4} as='header'>
			<Flex
				maxW={'1440px'}
				mx='auto'
				h={16}
				alignItems={'center'}
				justifyContent={'space-between'}
			>
				<Box
					color={useColorModeValue('gray.900', 'gray.100')}
					display={{ base: 'none', md: 'flex' }}
					flex={1}
					fontWeight={700}
					fontSize={24}
				>
					<Link href='/'>Kormelon</Link>
				</Box>
				<NavLinkMenu />
				<UserMenu />
			</Flex>
		</Box>
	);
};
