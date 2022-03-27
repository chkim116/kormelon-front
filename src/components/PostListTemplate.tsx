import styled from '@emotion/styled';
import Link from 'next/link';
import dayjs from 'dayjs';

import PostListPaginate from './PostListPaginate';

import { Post } from 'src/store/post';
import Tag from 'src/components/Tag';
import { DEFAULT_PER } from 'src/lib/constants';
import Empty from './Empty';

interface PostListTemplateProps {
	posts: Post;
	children?: React.ReactChild;
}

/**
 * post list component
 */
export const PostListTemplate = ({ posts }: PostListTemplateProps) => {
	const { results, total } = posts;

	return (
		<>
			<PostListTemplateStyle>
				{results?.length ? (
					results.map((post) => (
						<div className='container' key={post.id}>
							<div className='category'>
								<Link href={`/search/category?q=${post.category.parentValue}`}>
									{post.category.parentValue}
								</Link>
								<span>{'>'}</span>
								<Link href={`/search/category/sub?q=${post.category.value}`}>
									{post.category.value}
								</Link>
							</div>
							<h2 className='title'>
								<Link
									href={`/post/${post.id}/${encodeURIComponent(post.title)}`}
								>
									{post.title}
								</Link>
							</h2>
							<div className='tags'>
								{post.tags?.map((tag) => (
									<Tag
										key={tag.id}
										href={`/search/tag?q=${tag.value}`}
										className='tag'
									>
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
					<Empty />
				)}
			</PostListTemplateStyle>
			<PostListPaginate total={total} per={DEFAULT_PER} />
		</>
	);
};

const PostListTemplateStyle = styled.article`
	min-height: 80vh;

	.container {
		padding: 30px 0;
		margin-bottom: 10px;
		display: flex;
		flex-direction: column;
		gap: 8px;

		.category {
			margin-bottom: 10px;
			font-size: 13px;

			a {
				&:hover {
					text-decoration: underline;
				}
			}

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
