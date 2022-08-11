import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import qs from 'qs';

import { Section } from '@common/components/Section';
import { PostListSearchParams } from '@core/entities/posts/posts.entity';
import { PostCategories } from '../components/PostCategories';
import { PostList } from '../components/PostList';
import { PostSearchBar } from '../components/PostSearchBar';
import { selPostList, selPostListLoading } from '../stores/list/posts.selector';
import { usePostSearchParams } from '../hooks/usePostSearchParams';

export const PostListContainer = () => {
	const router = useRouter();

	const postList = useSelector(selPostList);
	const loading = useSelector(selPostListLoading);

	const params = usePostSearchParams();
	const navigate = (query: PostListSearchParams) =>
		router.push(
			router.pathname + qs.stringify(query, { addQueryPrefix: true })
		);

	const handleSearch = (keyword: string) => {
		navigate({ ...params, q: keyword });
	};

	return (
		<Section>
			<PostSearchBar onSearch={handleSearch} />
			<PostCategories />
			<PostList postList={postList} loading={loading} />
		</Section>
	);
};
