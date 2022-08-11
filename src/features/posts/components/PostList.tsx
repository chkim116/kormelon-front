import { SimpleGrid } from '@chakra-ui/react';
import { PostCard } from '@common/components/PostCard';
import { PostListEntity } from '@core/entities/posts/posts.entity';

interface PostListProps {
	loading: boolean;

	postList: PostListEntity[];
}

export const PostList = ({ loading, postList }: PostListProps) => {
	if (!loading && !postList.length) {
		return <div>Empty :(</div>;
	}

	return (
		<>
			<SimpleGrid
				py={{ base: '10', md: '20' }}
				columns={{ base: 1, lg: 3 }}
				justifyContent='center'
				rowGap='20'
				spacing='6'
			>
				{postList.map((post) => (
					<PostCard loading={loading} post={post} key={post.id} />
				))}
			</SimpleGrid>
		</>
	);
};
