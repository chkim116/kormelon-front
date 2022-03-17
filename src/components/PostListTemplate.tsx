import styled from '@emotion/styled';
import Link from 'next/link';
import dayjs from 'dayjs';

import { Post } from 'src/store/post';
import Tag from 'src/components/Tag';

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
							{post.category.parentValue}
							<span>{'>'}</span>
							{post.category.value}
						</div>
						<h2 className='title'>
							<Link href={`/post/${post.id}/${encodeURIComponent(post.title)}`}>
								{post.title}
							</Link>
						</h2>
						<div className='tags'>
							{post.tags?.map((tag) => (
								<Tag key={tag.id} className='tag'>
									{tag.value}
								</Tag>
							))}
						</div>
						<div className='meta'>
							<small>{dayjs(post.createdAt).format('YYYY-MM-DD')}</small>
							<span className='separator'>·</span>
							<small>{post.readTime}</small>
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

		.category {
			margin-bottom: 10px;
			font-size: 13px;

			span {
				margin: 0 6px;
			}
		}

		.title {
			margin-bottom: 16px;
		}

		.tags {
			display: flex;
			gap: 8px;
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
