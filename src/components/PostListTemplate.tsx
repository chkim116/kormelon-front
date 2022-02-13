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
					<h1 className='title'>
						<Link href={`/post/${encodeURIComponent(post.title)}`}>
							{post.title}
						</Link>
					</h1>
					<div className='meta'>
						<div className='category'>{post.category}</div>
						<span>
							<small className='created'>{post.createdAt}</small>
						</span>
					</div>
				</div>
			))}
		</PostListTemplateStyle>
	);
};

const PostListTemplateStyle = styled.article`
	.container {
		padding: 30px 0;
		display: flex;
		flex-direction: column;

		.title {
			margin-bottom: 10px;
		}

		.meta {
			display: flex;
			font-size: ${({ theme }) => theme.fontSizes.lg};

			.category {
				margin-right: 6px;
			}

			.created {
				margin-bottom: 12px;
			}
		}
	}
`;
