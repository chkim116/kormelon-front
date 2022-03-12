import store from 'src/store/config';
import { getPost } from 'src/store/post';
import Post from 'src/views/post';

export const getServerSideProps = store.getServerSideProps(
	(store) => async (ctx) => {
		const { params } = ctx;

		if (!params || !params['id']) {
			return {
				props: {},
				redirect: {
					permanent: false,
					destination: '/404',
				},
			};
		}

		const id = params['id'] as string;
		const { dispatch, getState } = store;
		await dispatch(getPost(id));
		const post = getState().post.post;

		return {
			props: {
				post,
			},
		};
	}
);

export default Post;
