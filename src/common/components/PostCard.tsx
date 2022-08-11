import { Flex, Box, Tooltip, useColorModeValue, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';

import { Image } from './Image';
import { NavLink } from './NavLink';

const TextStyled = styled(Text)`
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
`;

// TODO: API 연결 후 변경
interface Post {
	id: number;
	title: string;
	thumbnail: string;
	date: string;
	readTime: string;
}

interface PostCardProps {
	post: Post;
}

export const PostCard = ({ post }: PostCardProps) => {
	const textColor = useColorModeValue('gray.900', 'gray.100');
	const dateColor = useColorModeValue('gray.700', 'gray.300');

	return (
		<Box key={post.id} maxW='100%'>
			<Flex direction={'column'} alignItems={'center'}>
				<NavLink to={`/post/${post.title}`}>
					<Box role='group'>
						<Flex
							border={'2px solid transparent'}
							borderRadius={9}
							_groupHover={{
								borderColor: textColor,
								transition: 'border .75s',
							}}
						>
							<Image
								width='414px'
								height='547px'
								borderRadius={9}
								objectFit={'cover'}
								src={post.thumbnail}
								alt={`most article - ${post.title}`}
							/>
						</Flex>

						<Box maxW='414px' w='full'>
							<Box fontSize={{ base: 'md', lg: 'xl' }} mt='4' color={dateColor}>
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
					</Box>
				</NavLink>
			</Flex>
		</Box>
	);
};
