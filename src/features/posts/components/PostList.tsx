import { SimpleGrid } from '@chakra-ui/react';
import { PostCard } from '@common/components/PostCard';

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

export const PostList = () => {
	return (
		<>
			<SimpleGrid
				py={{ base: '10', md: '20' }}
				columns={{ base: 1, lg: 3 }}
				justifyContent='center'
				rowGap='20'
				spacing='6'
			>
				{POSTS.map((post) => (
					<PostCard post={post} key={post.id} />
				))}
			</SimpleGrid>
		</>
	);
};
