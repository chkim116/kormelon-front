import store from 'src/store/config';

export const getServerSideProps = store.getServerSideProps(
	(store) => async (ctx) => {
		// TODO: 카테고리 검색
		const { query } = ctx;

		if (query['q']) {
			const category = query['q'];
			return {
				props: {},
			};
		}

		return {
			props: {},
		};
	}
);

const sub = () => {
	return <div>sub</div>;
};

export default sub;
