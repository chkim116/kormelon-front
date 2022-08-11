import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { SearchIcon } from '@chakra-ui/icons';
import { Button, Flex, Heading, Input, SlideFade } from '@chakra-ui/react';

interface PostSearchBarProps {
	// eslint-disable-next-line no-unused-vars
	onSearch: (keyword: string) => void;
}

export const PostSearchBar = ({ onSearch }: PostSearchBarProps) => {
	const [keyword, setKeyword] = useState('');

	const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		setKeyword(e.target.value);
	};

	const handleSearch: FormEventHandler<HTMLDivElement> = (e) => {
		e.preventDefault();
		onSearch(keyword);
	};

	return (
		<SlideFade in={true}>
			<Heading mb='6'>Find my articles.</Heading>
			<Flex
				as='form'
				onSubmit={handleSearch}
				alignItems='center'
				position='relative'
				maxW={'540px'}
				mb='2'
			>
				<Input
					onChange={handleChange}
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
