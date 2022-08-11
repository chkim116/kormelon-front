import { useRouter } from 'next/router';

import { PostListSearchParams } from '@core/entities/posts/posts.entity';

export const usePostSearchParams = () => {
	const router = useRouter();

	function refinedQuery(query: Record<string, string>): PostListSearchParams {
		const { page = 1, per = 5 } = query;

		return {
			page: Number(page),
			per: Number(per),
		};
	}

	return refinedQuery(router.query as Record<string, string>);
};
