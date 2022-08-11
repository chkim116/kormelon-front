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
import { postListFixture } from '@features/posts/_fixtures/postList.fixture';

// FIXME: 샘플. 이후 제거
const POSTS = postListFixture;

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
					// TODO: 구현
					<PostCard key={post.id} post={post} loading={false} />
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
