import styled from '@emotion/styled';
import Link from 'next/link';

import { Post } from 'src/store/post';

interface PostListTemplateProps {
	posts: {
		total: number;
		results: Post[];
	};
	children?: React.ReactChild;
}

/**
 * post list component
 */
export const PostListTemplate = ({ posts }: PostListTemplateProps) => {
	const { results } = posts;

	return (
		<PostListTemplateStyle>
			{results?.length ? (
				results.map((post) => (
					<div className='container' key={post.id}>
						<div className='category'>
							{post.category.parentValue} {'>'} {post.category.value}
						</div>
						<h2 className='title'>
							<Link href={`/post/${post.id}/${encodeURIComponent(post.title)}`}>
								{post.title}
							</Link>
						</h2>
						<div>
							{post.tags?.map((tag) => (
								<span key={tag.id}>{tag.value}</span>
							))}
						</div>
						<div className='meta'>
							<small>{post.createdAt}</small>
							<span className='separator'>·</span>
							<small>{Math.floor(post.readTime)} min to read</small>
						</div>
					</div>
				))
			) : (
				// TODO: Empty
				<div>없습니다..</div>
			)}
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
		}

		.meta {
			display: flex;
			margin-top: 10px;

			.separator {
				margin: 0 2px;
			}
		}
	}
`;
