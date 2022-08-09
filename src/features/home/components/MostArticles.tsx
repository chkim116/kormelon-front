import styled from '@emotion/styled';
import {
	AspectRatio,
	Box,
	Container,
	Flex,
	Heading,
	SimpleGrid,
	Text,
	Tooltip,
	useColorModeValue,
} from '@chakra-ui/react';
import { NavLink } from '@common/components/NavLink';
import { Image } from '@common/components/Image';

const TextStyled = styled(Text)`
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
`;

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
	const dateColor = useColorModeValue('gray.700', 'gray.300');

	return (
		<Container
			maxW='1280px'
			mx='auto'
			as='section'
			py={{ base: 10, md: 24, lg: 36 }}
		>
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
					<Box key={post.id} maxW='100%'>
						<NavLink to={`/post/${post.title}`}>
							<Flex direction={'column'} alignItems={'center'} role='group'>
								<AspectRatio
									ratio={3 / 4}
									maxW='414px'
									maxH='547px'
									w='full'
									h='full'
									border='2px'
									borderRadius={10}
									color='transparent'
									_groupHover={{
										borderColor: textColor,
										transition: 'border .75s',
									}}
								>
									<Image
										borderRadius={9}
										layout='fill'
										objectFit={'cover'}
										src={post.thumbnail}
										alt={`most article - ${post.title}`}
									/>
								</AspectRatio>

								<Box maxW='414px' w='full'>
									<Box
										fontSize={{ base: 'md', lg: 'xl' }}
										mt='4'
										color={dateColor}
									>
										{post.date} - {post.readTime}
									</Box>
									<Box
										mt='2'
										fontSize={{ base: '2xl', lg: '3xl' }}
										color={textColor}
										fontWeight='700'
									>
										<Tooltip label={post.title} placement='bottom'>
											<TextStyled>{post.title}</TextStyled>
										</Tooltip>
									</Box>
								</Box>
							</Flex>
						</NavLink>
					</Box>
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
		</Container>
	);
};
