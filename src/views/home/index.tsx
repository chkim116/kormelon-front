import { PostListTemplate } from 'src/components/PostListTemplate';
import { Post } from 'src/store/post';
import HomeStyle from './HomeStyle';

interface HomeProps {
	posts: Post;
}

const Home = ({ posts }: HomeProps) => {
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
