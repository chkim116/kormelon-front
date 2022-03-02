import { GetServerSideProps } from 'next';

import { fetchUser } from 'src/lib/api/user';
import store from 'src/store/config';
import { getPost } from 'src/store/post';
import PostWrite from 'src/views/post/write';

// 유저 관리자 확인
export const getServerSideProps: GetServerSideProps = store.getServerSideProps(
	(store) => async (ctx) => {
		const {
			req: { cookies },
			query,
		} = ctx;

		const user = await fetchUser({
			headers: {
				Cookie: `auth=${cookies['auth']}`,
			},
			withCredentials: true,
		});

		if (!user.isAdmin) {
			return {
				props: {},
				redirect: {
					permanent: false,
					destination: '/login',
				},
			};
		}

		// query가 있으면 게시글의 정보를 불러온다. 만약 잘못된 쿼리면 /post/write로 리다이렉트
		if (query && query['edit']) {
			const { dispatch, getState } = store;
			await dispatch(getPost(query['edit'] as string));
			const prevPost = getState().post.post;

			if (prevPost) {
				return {
					props: {
						prevPost,
					},
				};
			}

			return {
				props: {},
				redirect: {
					permanent: false,
					destination: '/post/write',
				},
			};
		}

		return {
			props: {},
		};
	}
);

export default PostWrite;
