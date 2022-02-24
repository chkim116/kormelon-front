import { GetServerSideProps } from 'next';

import { fetchUser } from 'src/lib/api/user';
import PostWrite from 'src/views/post/write';

// 유저 관리자 확인
export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const { cookies } = ctx.req;

	const user = await fetchUser({
		headers: {
			Cookie: `auth=${cookies['auth']}`,
		},
		withCredentials: true,
	});

	if (!user.isAdmin) {
		return {
			props: {},
			redirect: {
				permanent: false,
				destination: '/login',
			},
		};
	}

	return {
		props: {},
	};
};

export default PostWrite;
