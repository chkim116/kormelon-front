import { GetServerSideProps } from 'next';

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

		// query가 있으면 게시글의 정보를 불러온다. 만약 잘못된 쿼리면 /post/write로 리다이렉트
		if (query && query['edit']) {
			const { dispatch, getState } = store;
			await dispatch(
				getPost({ id: query['edit'] as string, token: cookies['auth'] })
			);
			const prevPost = getState().post.post;

			if (prevPost) {
				return {
					props: {
						prevPost,
					},
				};
			}
		}

		return {
			props: {
				prevPost: null,
			},
		};
	}
);

export default PostWrite;
