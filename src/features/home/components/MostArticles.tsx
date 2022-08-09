import {
	Box,
	Flex,
	Heading,
	SimpleGrid,
	Text,
	useColorModeValue,
} from '@chakra-ui/react';

import { NavLink } from '@common/components/NavLink';
import { PostCard } from '@common/components/PostCard';
import { Section } from '@common/components/Section';

// FIXME: 샘플. 이후 제거
const POSTS = [
	{
		id: 1,
		title: '제목1',
		date: '2022-06-24',
		readTime: '2min',
		thumbnail:
			'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
	},
	{
		id: 2,
		title: '제목2',
		date: '2022-06-28',
		readTime: '3min',
		thumbnail:
			'https://images.unsplash.com/photo-1510832198440-a52376950479?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1467&q=80',
	},
	{
		id: 3,
		title: '제목3제목3제목3제목3제목3제목3제목3제목3제목3제목3  제목3제목3제',
		date: '2022-06-28',
		readTime: '3min',
		thumbnail:
			'https://images.unsplash.com/photo-1510832198440-a52376950479?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1467&q=80',
	},
];

export const MostArticles = () => {
	const textColor = useColorModeValue('gray.900', 'gray.100');

	return (
		<Section>
			<Heading textAlign={'center'} color={textColor}>
				Most Articles
			</Heading>
			<SimpleGrid
				py={{ base: '10', md: '20' }}
				columns={{ base: 1, lg: 3 }}
				justifyContent='center'
				rowGap='20'
				spacing='6'
			>
				{POSTS.map((post) => (
					<PostCard key={post.id} post={post} />
				))}
			</SimpleGrid>

			<Flex justifyContent={{ base: 'center', lg: 'flex-end' }}>
				<NavLink to='/posts'>
					<Box fontSize='2xl' role='group'>
						<Flex>
							More
							<Text
								ml='3'
								transition={'opacity 300ms'}
								opacity={0}
								_groupHover={{ opacity: 1 }}
							>
								?
							</Text>
						</Flex>
					</Box>
				</NavLink>
			</Flex>
		</Section>
	);
};
