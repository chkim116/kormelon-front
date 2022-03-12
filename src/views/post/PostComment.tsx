import { useCallback, useMemo, useState } from 'react';
import { BsPlus } from 'react-icons/bs';
import { FiMinus } from 'react-icons/fi';

import Button from 'src/components/Button';
import { useAppSelector } from 'src/store/config';

import { PostCommentStyle } from './PostStyle';

export interface Comment {
	id: string;
	text: string;
	username: string;
	password: string;
	createdAt: string;
	commentReplies: {
		id: string;
		text: string;
		username: string;
		password: string;
		createdAt: string;
	}[];
}

interface PostCommentProps {
	comments: Comment[];
}

const PostComment = ({ comments }: PostCommentProps) => {
	const { userData } = useAppSelector((state) => state.user);
	const isLogged = useMemo(() => !!userData?.id, []);

	const [isOpenReplyids, setIsOpenReplyIds] = useState<string[]>([]);

	const onClickOpenReply = useCallback((e) => {
		const { commentid: commentId } = e.currentTarget.dataset;

		setIsOpenReplyIds((prev) => {
			if (!prev.length) {
				return [commentId];
			}

			if (prev.includes(commentId)) {
				return prev.filter((id) => id !== commentId);
			}

			return [...prev, commentId];
		});
	}, []);

	return (
		<PostCommentStyle>
			<div className='comment-container'>
				<div className='count'>{comments.length}개의 댓글</div>

				{/* 댓글 */}
				<form>
					<textarea placeholder='댓글을 작성하세요.' />
					{/* 로그인 안했을시만 오픈, 익명 댓글을 위함 */}
					{isLogged ? null : (
						<div className='anonymous'>
							<input type='text' placeholder='이름' />
							<input type='password' placeholder='비밀번호' />
						</div>
					)}
					<Button type='submit' color='primary'>
						댓글 작성
					</Button>
				</form>

				{comments.map((comment) => (
					<div className='comment-list' key={comment.id}>
						<div className='comment-box'>
							<div className='user'>
								<div>{comment.username}</div>
								<div>{comment.createdAt}</div>
							</div>
							<div className='text'>{comment.text}</div>

							<div className='reply-btn'>
								<div onClick={onClickOpenReply} data-commentid={comment.id}>
									<span>
										{isOpenReplyids.includes(comment.id) ? (
											<FiMinus />
										) : (
											<BsPlus />
										)}
									</span>
									<button type='button'>
										{comment.commentReplies.length}개의 답글
									</button>
								</div>
							</div>
						</div>

						{/* 대댓글 */}
						{isOpenReplyids.includes(comment.id) && (
							<div className='reply-box'>
								<form>
									<textarea placeholder='답변을 작성하세요.' />
									{/* 로그인 안했을시만 오픈, 익명 대댓을 위함 */}
									{isLogged ? null : (
										<div className='anonymous'>
											<input type='text' placeholder='이름' />
											<input type='password' placeholder='비밀번호' />
										</div>
									)}
									<Button color='primary' type='submit'>
										답변 작성
									</Button>
								</form>

								{comment.commentReplies.map((reply) => (
									<div className='comment-box' key={reply.id}>
										<div className='user'>
											<div>{reply.username}</div>
											<div>{reply.createdAt}</div>
										</div>
										<div className='text'>{reply.text}</div>
									</div>
								))}
							</div>
						)}
					</div>
				))}
			</div>
		</PostCommentStyle>
	);
};

export default PostComment;
