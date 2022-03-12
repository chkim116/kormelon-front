import { useRouter } from 'next/router';
import { useCallback, useMemo, useState } from 'react';
import { BsPencil, BsPlus } from 'react-icons/bs';
import { FiMinus } from 'react-icons/fi';
import dayjs from 'dayjs';

import Button from 'src/components/Button';
import { useNotification } from 'src/hooks/useNotification';
import {
	deleteComment,
	deleteReply,
	patchComment,
	patchReply,
	postCreateComment,
	postCreateReply,
} from 'src/store/comment';
import { useAppDispatch, useAppSelector } from 'src/store/config';

import { PostCommentStyle } from './PostStyle';
import { MdDelete } from 'react-icons/md';

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

interface CommentValue {
	id: string;
	type: 'comment' | 'reply' | '';
	text: string;
}

const PostComment = ({ comments }: PostCommentProps) => {
	const dispatch = useAppDispatch();
	const { userData } = useAppSelector((state) => state.user);
	const { query } = useRouter();
	const { callNotification } = useNotification();

	const isLogged = useMemo(() => !!userData?.id, [userData]);

	const [isOpenReplyids, setIsOpenReplyIds] = useState<string[]>([]);
	const [commentValues, setCommentValues] = useState<CommentValue[]>([]);
	const [anonymousUser, setAnonymousUser] = useState({
		username: '익명',
		password: '',
	});

	const [editCommentValue, setEditCommentValue] = useState({
		id: '',
		text: '',
	});

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

	const onChangeForm = useCallback((e) => {
		const {
			name: type,
			value: text,
			dataset: { id },
		} = e.target;

		if (type !== 'reply' && type !== 'comment') {
			return setAnonymousUser((prev) => ({ ...prev, [type]: text }));
		}

		setCommentValues((prev) => {
			if (!prev.length) {
				return [{ type, text, id }];
			}

			if (prev.find((value) => value.id === id)) {
				return prev.map((v) => ({
					...v,
					type: v.id === id ? type : v.type,
					text: v.id === id ? text : v.text,
				}));
			}

			return [...prev, { type, text, id }];
		});
	}, []);

	const onSubmitForm = useCallback(
		(e) => {
			e.preventDefault();
			const { id } = e.target.dataset;

			// 작성을 누른 곳에 값이 없으면
			if (!commentValues.find((value) => value.id === id)?.text) {
				return callNotification({
					type: 'danger',
					message: '값을 입력해 주세요.',
				});
			}

			const commentValue = commentValues.find((value) => value.id === id);

			if (!commentValue) {
				return callNotification({
					type: 'danger',
					message: '오류 입니다. 새로고침 후 시도해 보세요.',
				});
			}
			// 익명 유저일시 동봉. 로그인 유저일시 동봉하지 않음.
			const toCreateData = Object.assign(
				{
					id: commentValue.id,
					text: commentValue.text,
				},
				userData ? {} : anonymousUser
			);

			commentValue.type === 'comment' &&
				dispatch(postCreateComment(toCreateData));

			commentValue.type === 'reply' && dispatch(postCreateReply(toCreateData));
		},
		[commentValues, anonymousUser, userData]
	);

	// 댓글 수정과 삭제
	const onChangeEditComment = useCallback((e) => {
		setEditCommentValue((prev) => ({ ...prev, text: e.target.value }));
	}, []);

	const onClickToChangeEditMode = useCallback((e) => {
		const { id, text } = e.currentTarget.dataset;
		setEditCommentValue({ id, text });
	}, []);

	const onClickEditSubmit = useCallback(
		(e) => {
			const { type } = e.currentTarget.dataset;

			if (type === 'comment') {
				dispatch(patchComment(editCommentValue));
			}

			if (type === 'reply') {
				dispatch(patchReply(editCommentValue));
			}
		},
		[dispatch, patchComment, patchReply, editCommentValue]
	);

	const onClickCommentDelete = useCallback(
		(e) => {
			const { id, type } = e.currentTarget.dataset;

			if (window.confirm('댓글을 삭제하십니까?')) {
				if (type === 'comment') {
					dispatch(deleteComment(id));
				}

				if (type === 'reply') {
					dispatch(deleteReply(id));
				}
			}
		},
		[dispatch, deleteComment, deleteReply]
	);

	const onClickEditCancel = useCallback(() => {
		setEditCommentValue({ id: '', text: '' });
	}, []);

	return (
		<PostCommentStyle>
			<div className='comment-container'>
				<div className='count'>{comments.length}개의 댓글</div>

				{/* 댓글 */}
				<form
					onChange={onChangeForm}
					onSubmit={onSubmitForm}
					data-id={query.id}
				>
					<textarea
						className='comment-input'
						name='comment'
						placeholder='댓글을 작성하세요.'
						data-id={query.id}
					/>
					{/* 로그인 안했을시만 오픈, 익명 댓글을 위함 */}
					{isLogged ? null : (
						<div className='anonymous'>
							<input
								type='text'
								placeholder='이름'
								name='username'
								autoComplete='username'
								defaultValue={anonymousUser.username}
							/>
							<input
								type='password'
								placeholder='비밀번호'
								name='password'
								autoComplete='current-password'
								defaultValue={anonymousUser.password}
							/>
						</div>
					)}
					<Button type='submit' color='primary'>
						댓글 작성
					</Button>
				</form>

				{comments.map((comment) => (
					<div className='comment-list' key={comment.id}>
						<div className='comment-box'>
							<div className='box-title'>
								<div className='user'>
									<div>{comment.username}</div>
									<div>{dayjs(comment.createdAt).format('YYYY-MM-DD')}</div>
								</div>
								<div className='etc'>
									<span
										data-id={comment.id}
										data-text={comment.text}
										onClick={onClickToChangeEditMode}
									>
										<BsPencil />
									</span>
									<span
										data-id={comment.id}
										data-type='comment'
										onClick={onClickCommentDelete}
									>
										<MdDelete />
									</span>
								</div>
							</div>

							{/* 수정시 textarea로 */}
							{editCommentValue.id === comment.id ? (
								<div className='comment-edit'>
									<textarea
										className='comment-input edit'
										onChange={onChangeEditComment}
										defaultValue={comment.text}
									/>
									<span>
										<Button
											color='primary'
											data-type='comment'
											onClick={onClickEditSubmit}
										>
											수정
										</Button>
										<Button onClick={onClickEditCancel}>취소</Button>
									</span>
								</div>
							) : (
								<div className='text'>{comment.text}</div>
							)}

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
								<form
									onChange={onChangeForm}
									onSubmit={onSubmitForm}
									data-id={comment.id}
								>
									<textarea
										className='comment-input'
										name='reply'
										placeholder='답변을 작성하세요.'
										data-id={comment.id}
									/>
									{/* 로그인 안했을시만 오픈, 익명 대댓을 위함 */}
									{isLogged ? null : (
										<div className='anonymous'>
											<input
												type='text'
												placeholder='이름'
												name='username'
												autoComplete='username'
												defaultValue={anonymousUser.username}
											/>
											<input
												type='password'
												placeholder='비밀번호'
												name='password'
												autoComplete='current-password'
												defaultValue={anonymousUser.password}
											/>
										</div>
									)}
									<Button color='primary' type='submit'>
										답변 작성
									</Button>
								</form>

								{comment.commentReplies.map((reply) => (
									<div className='comment-box' key={reply.id}>
										<div className='box-title'>
											<div className='user'>
												<div>{reply.username}</div>
												<div>{dayjs(reply.createdAt).format('YYYY-MM-DD')}</div>
											</div>

											<div className='etc'>
												<span
													data-id={reply.id}
													data-text={reply.text}
													onClick={onClickToChangeEditMode}
												>
													<BsPencil />
												</span>
												<span
													data-id={reply.id}
													data-type='reply'
													onClick={onClickCommentDelete}
												>
													<MdDelete />
												</span>
											</div>
										</div>

										{editCommentValue.id === reply.id ? (
											<div className='comment-edit'>
												<textarea
													className='comment-input edit'
													onChange={onChangeEditComment}
													defaultValue={reply.text}
												/>
												<span>
													<Button
														color='primary'
														data-type='reply'
														onClick={onClickEditSubmit}
													>
														수정
													</Button>
													<Button onClick={onClickEditCancel}>취소</Button>
												</span>
											</div>
										) : (
											<div className='text'>{reply.text}</div>
										)}
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
