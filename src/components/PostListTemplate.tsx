import styled from '@emotion/styled';
import Link from 'next/link';
import dayjs from 'dayjs';
import { FaComment } from 'react-icons/fa';
import { IoEyeSharp } from 'react-icons/io5';

import PostListPaginate from './PostListPaginate';

import { Posts } from 'src/store/post';
import Tag from 'src/components/Tag';
import { DEFAULT_PER } from 'src/lib/constants';
import Empty from './Empty';

interface PostListTemplateProps {
	posts: Posts;
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
								<div>
									<small>{dayjs(post.createdAt).format('YYYY-MM-DD')}</small>
									<span className='separator'>·</span>
									<small>{post.readTime}</small>
								</div>
								<div>
									<small className='comments'>
										<FaComment />
										{post.commentLength}
									</small>
									<span className='separator'>·</span>
									<small className='view'>
										<IoEyeSharp />
										{post.view}
									</small>
								</div>
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
			flex-direction: column;
			margin-top: 10px;

			.separator {
				margin: 0 4px;
			}

			div {
				display: flex;
				align-items: center;
			}

			.comments,
			.view {
				display: flex;
				align-items: center;

				svg {
					margin-right: 6px;
					color: ${({ theme }) => theme.colors.onPrimary};
					font-size: 12px;
					transform: scale(-1, 1);
				}
			}
		}
	}
`;
