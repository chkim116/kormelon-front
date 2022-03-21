import queryString from 'query-string';

import SearchByTag from 'src/views/search/tag';

import store from 'src/store/config';
import { getPostByTag } from 'src/store/search';

export const getServerSideProps = store.getServerSideProps(
	({ dispatch }) =>
		async (ctx) => {
			const { query } = ctx;

			if (query['q']) {
				const q = query['q'];
				const page = query['page'] || 1;
				const per = query['per'] || 10;

				const toQuery = queryString.stringify({ q, per, page });

				await dispatch(getPostByTag(toQuery));

				return {
					props: {},
				};
			}
			return {
				props: {},
			};
		}
);

export default SearchByTag;