import { Section } from '@common/components/Section';
import { PostCategories } from '../components/PostCategories';
import { PostList } from '../components/PostList';
import { PostSearchBar } from '../components/PostSearchBar';

export const PostListContainer = () => {
	return (
		<Section>
			<PostSearchBar />
			<PostCategories />
			<PostList />
		</Section>
	);
};
