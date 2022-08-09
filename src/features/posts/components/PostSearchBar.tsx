import { SearchIcon } from '@chakra-ui/icons';
import { Button, Flex, Heading, Input, SlideFade } from '@chakra-ui/react';

export const PostSearchBar = () => {
	return (
		<SlideFade in={true}>
			<Heading mb='6'>Find my articles.</Heading>
			<Flex
				as='form'
				alignItems='center'
				position='relative'
				maxW={'540px'}
				mb='2'
			>
				<Input
					spellCheck={false}
					placeholder='Search'
					p={{ base: '4', md: '6' }}
					borderRadius={24}
				/>
				<Button
					position={'absolute'}
					right='0'
					p={{ base: '4', md: '6' }}
					borderTopRightRadius={24}
					borderBottomRightRadius={24}
				>
					<SearchIcon />
				</Button>
			</Flex>
		</SlideFade>
	);
};
