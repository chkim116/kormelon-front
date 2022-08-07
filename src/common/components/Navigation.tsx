import { Box, Flex, useColorModeValue } from '@chakra-ui/react';

import { NavLinkMenu } from './NavLinkMenu';
import { UserMenu } from './UserMenu';

export const Navigation = () => {
	return (
		<Box bg={useColorModeValue('white', 'gray.900')} px={4}>
			<Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
				<Box
					display={{ base: 'none', md: 'flex' }}
					flex={1}
					fontWeight={700}
					fontSize={24}
				>
					Kormelon
				</Box>
				<NavLinkMenu />
				<UserMenu />
			</Flex>
		</Box>
	);
};
