import styled from '@emotion/styled';
import Link from 'next/link';

interface Post {
	id: string;
	title: string;
	createdAt: string;
	category: string;
}

interface PostListTemplateProps {
	posts: Post[];
	children?: React.ReactChild;
}

/**
 * post list component
 */
export const PostListTemplate = ({ posts }: PostListTemplateProps) => {
	return (
		<PostListTemplateStyle>
			{posts.map((post) => (
				<div className='container' key={post.id}>
					<div className='category'>{post.category}</div>
					<h2 className='title'>
						<Link href={`/post/${encodeURIComponent(post.title)}`}>
							{post.title}
						</Link>
					</h2>
					<div className='meta'>
						<small>{post.createdAt}</small>
						<span className='separator'>·</span>
						<small>3 min to read</small>
					</div>
				</div>
			))}
		</PostListTemplateStyle>
	);
};

const PostListTemplateStyle = styled.article`
	.container {
		padding: 30px 0;
		margin-bottom: 10px;
		display: flex;
		flex-direction: column;
		gap: 8px;

		.title {
		}

		.category {
			margin-bottom: 6px;
			font-size: ${({ theme }) => theme.fontSizes.lg};
		}

		.meta {
			display: flex;
			margin-top: 10px;
			color: ${({ theme }) => theme.colors.onSecondary};

			.separator {
				margin: 0 2px;
			}
		}
	}
`;
