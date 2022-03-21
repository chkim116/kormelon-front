import queryString from 'query-string';

import SearchBySub from 'src/views/search/category/sub';

import store from 'src/store/config';
import { getPostBySubCategory } from 'src/store/search';

export const getServerSideProps = store.getServerSideProps(
	({ dispatch }) =>
		async (ctx) => {
			const { query } = ctx;

			if (query['q']) {
				const q = query['q'];
				const page = query['page'] || 1;
				const per = query['per'] || 10;

				const toQuery = queryString.stringify({ q, per, page });

				await dispatch(getPostBySubCategory(toQuery));

				return {
					props: {},
				};
			}
			return {
				props: {},
			};
		}
);

export default SearchBySub;
