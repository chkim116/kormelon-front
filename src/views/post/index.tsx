import Link from 'next/link';
import { useMemo } from 'react';
import dayjs from 'dayjs';
import DOMPurify from 'isomorphic-dompurify';
import { marked } from 'marked';
import { BsPencil } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';

import PostAnchors from './PostAnchors';
import PostComment from './PostComment';

import { PostStyle } from './PostStyle';

import { ALLOWED_TAGS, ALLOWED_URI_REGEXP } from 'src/lib/domPurifyConfig';
import Tag from 'src/components/Tag';
import 'src/lib/markedConfig';
import { PostDetail } from 'src/store/post';
import { useAppSelector } from 'src/store/config';

DOMPurify.setConfig({
	ALLOWED_TAGS,
	ALLOWED_URI_REGEXP,
});

interface PostProps {
	post: PostDetail;
}

const Post = ({ post }: PostProps) => {
	const { userData } = useAppSelector((state) => state.user);
	// h1 뽑는 정규
	const anchorRegExp =
		/<([h][1])[^>]*>[ㄱ-ㅎ\ㅏ-ㅣ\가-힣\w\s\.\!\@\#\$\%\^\&\*\(\)\-\=\+\_\?\,\;\"\'\|\/\~\{\:\\\/\}\>]+<\/\h1>/g;

	const parsedContent = useMemo(() => {
		return DOMPurify.sanitize(marked.parse(post.content));
	}, [post.content]);

	// h1 뽑고.. anchor로 보낼 얘들
	const anchors = parsedContent
		.match(anchorRegExp)
		?.map((anchor) => anchor.replace(/<[^>]*>?/g, '').replace(/ /g, '-'));

	const comments = Array.from({ length: 10 }).map((_, i) => {
		return {
			id: i.toString(),
			text: '댓글인데요' + i,
			createdAt: dayjs().format('YYYY-MM-DD'),
			username: 'ckim',
			password: '123',
			commentReplies: Math.round(Math.random() * 1)
				? [
						{
							id: '2',
							text: '대댓글인데요',
							username: 'userna',
							password: 'pas',
							createdAt: dayjs().format('YYYY-MM-DD'),
						},
				  ]
				: [],
		};
	});

	return (
		<PostStyle>
			<div className='post'>
				<div className='category'>
					{post.category.parentValue} {'>'} {post.category.value}
				</div>
				<h1 className='title'>{post.title}</h1>
				<div className='info'>
					<small>{dayjs(post.createdAt).format('YYYY-MM-DD')}</small>
					<span className='separator'>·</span>
					<small>{Math.floor(post.readTime)} min to read</small>
				</div>

				<div className='tags'>
					{post.tags.length &&
						post.tags.map((tag) => (
							// TODO: tag link..
							<Tag key={tag.id} href={`/${tag}`}>
								{tag.value}
							</Tag>
						))}
				</div>

				{post.userId === userData?.id && userData?.isAdmin && (
					<div>
						<Link href={`/post/write/?edit=${post.id}`} passHref>
							<a>
								<BsPencil />
							</a>
						</Link>
						<MdDelete />
					</div>
				)}

				<div
					className='content'
					dangerouslySetInnerHTML={{
						__html: parsedContent,
					}}
				/>
				<PostComment comments={comments} />
			</div>

			<div className='anchors'>
				<PostAnchors anchors={anchors || []} />
			</div>
		</PostStyle>
	);
};

export default Post;
