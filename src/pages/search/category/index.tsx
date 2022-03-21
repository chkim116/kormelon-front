import queryString from 'query-string';

import SearchByCategory from 'src/views/search/category';

import store from 'src/store/config';
import { getPostByCategory } from 'src/store/search';

export const getServerSideProps = store.getServerSideProps(
	({ dispatch }) =>
		async (ctx) => {
			const { query } = ctx;

			if (query['q']) {
				const q = query['q'];
				const page = query['page'] || 1;
				const per = query['per'] || 10;

				const toQuery = queryString.stringify({ q, per, page });

				await dispatch(getPostByCategory(toQuery));

				return {
					props: {},
				};
			}
			return {
				props: {},
			};
		}
);

export default SearchByCategory;
