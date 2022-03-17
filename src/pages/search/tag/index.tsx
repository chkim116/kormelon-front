import store from 'src/store/config';

export const getServerSideProps = store.getServerSideProps(
	(store) => async (ctx) => {
		const { query } = ctx;

		if (query['q']) {
			const tag = query['q'];
			// TODO: 태그 검색
			return {
				props: {},
			};
		}
		return {
			props: {},
		};
	}
);

const index = () => {
	return <div>index</div>;
};

export default index;
