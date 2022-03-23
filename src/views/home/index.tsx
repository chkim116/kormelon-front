import { PostListTemplate } from 'src/components/PostListTemplate';
import { Post } from 'src/store/post';
import HomeStyle from './HomeStyle';

interface HomeProps {
	posts: Post;
}

const Home = ({ posts }: HomeProps) => {
	return (
		<HomeStyle>
			<PostListTemplate posts={posts} />
		</HomeStyle>
	);
};

export default Home;
