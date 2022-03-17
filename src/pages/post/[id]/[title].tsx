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
		const { dispatch } = store;
		await dispatch(getPost(id));

		return {
			props: {},
		};
	}
);

export default Post;
