import { useRouter } from 'next/router';
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
import { deletePost } from 'src/store/post';
import { useAppDispatch, useAppSelector } from 'src/store/config';
import Button from 'src/components/Button';

DOMPurify.setConfig({
	ALLOWED_TAGS,
	ALLOWED_URI_REGEXP,
});

const Post = () => {
	const dispatch = useAppDispatch();
	const { userData } = useAppSelector((state) => state.user);
	const { post } = useAppSelector((state) => state.post);
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
		?.map((anchor) => anchor.replace(/<[^>]*>?/g, ''));

	const onClickPostDelete = useCallback(
		(e) => {
			const { id } = e.currentTarget;
			if (window.confirm('정말 삭제 하십니까?')) {
				dispatch(deletePost(id)).then(() => router.push('/'));
			}
		},
		[dispatch, router]
	);

	return (
		<PostStyle>
			<div className='post'>
				<div className='category'>
					<Link href={`/search/category?q=${post.category.parentValue}`}>
						{post.category.parentValue}
					</Link>
					<span>{'>'}</span>
					<Link href={`/search/category/sub?q=${post.category.value}`}>
						{post.category.value}
					</Link>
				</div>
				<h1 className='title'>{post.title}</h1>
				<div className='info'>
					<small>{dayjs(post.createdAt).format('YYYY-MM-DD')}</small>
					<span className='separator'>·</span>
					<small>{post.readTime}</small>
				</div>

				<div className='tags'>
					{post.tags.length
						? post.tags.map((tag) => (
								<Tag key={tag.id} href={`/search/tag?q=${tag.value}`}>
									{tag.value}
								</Tag>
						  ))
						: null}
				</div>

				{post.userId === userData?.id && userData?.isAdmin && (
					<div className='btns'>
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
				<PostComment />
			</div>

			<div className='anchors'>
				<PostAnchors anchors={anchors || []} />
			</div>
		</PostStyle>
	);
};

export default Post;
