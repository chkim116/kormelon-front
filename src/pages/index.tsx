import Home from 'src/views/home';
import queryString from 'query-string';

import store from 'src/store/config';
import { getPosts } from 'src/store/post';
import { DEFAULT_PAGE, DEFAULT_PER } from 'src/lib/constants';

export const getServerSideProps = store.getServerSideProps(
	(store) => async (ctx) => {
		const { query } = ctx;

		const page = query['page'] || DEFAULT_PAGE;
		const per = query['per'] || DEFAULT_PER;

		const queries = queryString.stringify({ per, page });

		const { dispatch, getState } = store;
		await dispatch(getPosts(queries));

		return {
			props: {
				posts: getState().post.posts,
			},
		};
	}
);

export default Home;
