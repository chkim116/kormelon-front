import { useSelector } from 'react-redux';

import { Section } from '@common/components/Section';
import { PostCategories } from '../components/PostCategories';
import { PostList } from '../components/PostList';
import { PostSearchBar } from '../components/PostSearchBar';
import { selPostList, selPostListLoading } from '../stores/list/posts.selector';

export const PostListContainer = () => {
	const postList = useSelector(selPostList);
	const loading = useSelector(selPostListLoading);

	return (
		<Section>
			<PostSearchBar />
			<PostCategories />
			<PostList postList={postList} loading={loading} />
		</Section>
	);
};
