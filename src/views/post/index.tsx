import Link from 'next/link';
import { useCallback, useMemo } from 'react';
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
import { deletePost, PostDetail } from 'src/store/post';
import { useAppDispatch, useAppSelector } from 'src/store/config';
import Button from 'src/components/Button';
import { useRouter } from 'next/router';
import { useNotification } from 'src/hooks/useNotification';

DOMPurify.setConfig({
	ALLOWED_TAGS,
	ALLOWED_URI_REGEXP,
});

interface PostProps {
	post: PostDetail;
}

const Post = ({ post }: PostProps) => {
	const dispatch = useAppDispatch();
	const { userData } = useAppSelector((state) => state.user);
	const { callNotification } = useNotification();
	const router = useRouter();

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

	const onClickPostDelete = useCallback((e) => {
		const { id } = e.currentTarget;
		if (window.confirm('정말 삭제 하십니까?')) {
			dispatch(deletePost(id))
				.then(() => router.push('/'))
				.catch(() =>
					callNotification({ type: 'danger', message: '삭제에 실패했습니다.' })
				);
		}
	}, []);

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
					{post.tags.length
						? post.tags.map((tag) => (
								// TODO: tag link..
								<Tag key={tag.id} href={`/${tag}`}>
									{tag.value}
								</Tag>
						  ))
						: null}
				</div>

				{post.userId === userData?.id && userData?.isAdmin && (
					<div>
						<Button>
							<Link href={`/post/write/?edit=${post.id}`} passHref>
								<a>
									<BsPencil />
								</a>
							</Link>
						</Button>
						<Button id={post.id} onClick={onClickPostDelete}>
							<MdDelete />
						</Button>
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
