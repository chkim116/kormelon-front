import Home from 'src/views/home';

import store from 'src/store/config';
import { getPosts } from 'src/store/post';

export const getServerSideProps = store.getServerSideProps(
	(store) => async () => {
		const { dispatch, getState } = store;
		await dispatch(getPosts());

		return {
			props: {
				posts: getState().post.posts,
			},
		};
	}
);

export default Home;
