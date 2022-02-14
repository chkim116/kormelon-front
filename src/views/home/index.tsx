import dayJs from 'dayJs';

import { PostListTemplate } from 'src/components/PostListTemplate';
import HomeStyle from './HomeStyle';

const Home = () => {
	const posts = [
		{
			id: '0',
			title: '블로그 소개',
			category: 'Notice',
			createdAt: dayJs(new Date()).format('YYYY.MM.DD'),
		},
		{
			id: '1',
			title: '블로그 소개',
			category: 'IT News',
			createdAt: dayJs(new Date()).format('YYYY.MM.DD'),
		},
		{
			id: '2',
			title: 'Next 소개',
			category: 'IT News',
			createdAt: dayJs(new Date()).format('YYYY.MM.DD'),
		},
	];

	return (
		<HomeStyle>
			<div className='description'>
				<p>Hello, My World.</p>
				<p>This blog is open source.</p>
				<p>If you wanna start blog project. check it out my repository</p>
				{/* TODO: 레포 링크 */}
				<a href='/' target='blank'>
					blog-booster
				</a>
			</div>

			<PostListTemplate posts={posts} />
		</HomeStyle>
	);
};

export default Home;
