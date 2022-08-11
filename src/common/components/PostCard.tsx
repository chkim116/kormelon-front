import { Box, Flex, Text, Tooltip, useColorModeValue } from '@chakra-ui/react';
import styled from '@emotion/styled';

import { PostListEntity } from '@core/entities/posts/posts.entity';
import { Image } from './Image';
import { NavLink } from './NavLink';

const TextStyled = styled(Text)`
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
`;

const SAMPLE_THUMBNAIL =
	'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80';

interface PostCardProps {
	post: PostListEntity;
	loading: boolean;
}

export const PostCard = ({ post, loading }: PostCardProps) => {
	const textColor = useColorModeValue('gray.900', 'gray.100');
	const dateColor = useColorModeValue('gray.700', 'gray.300');

	return (
		<Box key={post.id} maxW='100%'>
			{loading && 'TODO: loading 중이라면 스켈레톤'}
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
								src={SAMPLE_THUMBNAIL}
								alt={`most article - ${post.title}`}
							/>
						</Flex>

						<Box maxW='414px' w='full'>
							<Box fontSize={{ base: 'md', lg: 'xl' }} mt='4' color={dateColor}>
								{post.createdAt} - {post.readTime}min
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
