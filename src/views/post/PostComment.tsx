import { useRouter } from 'next/router';
import { useCallback, useMemo, useState } from 'react';
import { BsPencil, BsPlus } from 'react-icons/bs';
import { FiMinus } from 'react-icons/fi';
import dayjs from 'dayjs';
import { MdDelete } from 'react-icons/md';

import Button from 'src/components/Button';
import Modal from 'src/components/Modal';

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

export interface Comment {
	id: string;
	text: string;
	userId: string | null;
	username: string;
	createdAt: string;
	deletedAt: string | null;
	isAnonymous: boolean;
	commentReplies: {
		id: string;
		text: string;
		userId: string | null;
		username: string;
		isAnonymous: boolean;
		createdAt: string;
	}[];
}

interface CommentValue {
	id: string;
	type: 'comment' | 'reply' | '';
	text: string;
}

interface PostCommentProps {
	comments: Comment[];
}

const PostComment = ({ comments }: PostCommentProps) => {
	const dispatch = useAppDispatch();
	const { userData } = useAppSelector((state) => state.user);
	const { query } = useRouter();
	const { callNotification } = useNotification();

	const isLogged = useMemo(() => !!userData?.id, [userData]);

	const [postComments, setPostComments] = useState<Comment[]>(comments);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [isOpenReplyids, setIsOpenReplyIds] = useState<string[]>([]);
	const [commentValues, setCommentValues] = useState<CommentValue[]>([]);
	const [anonymousUser, setAnonymousUser] = useState({
		username: '익명',
		password: '',
	});

	const [editCommentValue, setEditCommentValue] = useState({
		id: '',
		text: '',
		type: '',
		anonymous: '',
	});
	const [deleteCommentValue, setDeleteCommentValue] = useState({
		id: '',
		type: '',
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

	// 댓글 작성시
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
				dispatch(postCreateComment(toCreateData))
					.unwrap()
					.then((res) => setPostComments((prev) => [res, ...prev]));

			commentValue.type === 'reply' &&
				dispatch(postCreateReply(toCreateData))
					.unwrap()
					.then((res) =>
						setPostComments((prev) =>
							prev.map((comment) => ({
								...comment,
								commentReplies:
									comment.id === commentValue.id
										? [res, ...comment.commentReplies]
										: comment.commentReplies,
							}))
						)
					);
		},
		[commentValues, anonymousUser, userData]
	);

	// * 댓글 수정 입력 받기
	const onChangeEditComment = useCallback((e) => {
		setEditCommentValue((prev) => ({ ...prev, text: e.target.value }));
	}, []);

	// * 수정 버튼 클릭 시
	const onClickToChangeEditMode = useCallback(
		(e) => {
			const { id, text, type, anonymous } = e.currentTarget.dataset;

			setEditCommentValue({ id, text, type, anonymous });
		},
		[userData]
	);

	// * 수정 모드 취소
	const onClickEditCancel = useCallback(() => {
		setEditCommentValue({ id: '', text: '', type: '', anonymous: '' });
	}, []);

	// * 수정 완료
	const onClickEditSubmit = useCallback(() => {
		const { type, anonymous, ...data } = editCommentValue;

		if (!userData?.isAdmin && anonymous === 'true') {
			return setIsEditModalOpen(true);
		}

		if (type === 'comment') {
			dispatch(patchComment(data))
				.unwrap()
				.then(() =>
					setPostComments((prev) =>
						prev.map((comment) => ({
							...comment,
							text: comment.id === data.id ? data.text : comment.text,
						}))
					)
				);
		}

		if (type === 'reply') {
			dispatch(patchReply(data))
				.unwrap()
				.then(() =>
					setPostComments((prev) =>
						prev.map((comment) => ({
							...comment,
							commentReplies: comment.commentReplies.map((reply) => ({
								...reply,
								text: reply.id === data.id ? data.text : reply.text,
							})),
						}))
					)
				);
		}

		setEditCommentValue({ id: '', text: '', type: '', anonymous: '' });
	}, [dispatch, patchComment, patchReply, editCommentValue]);

	// * 삭제 버튼 클릭 시
	const onClickCommentDelete = useCallback(
		(e) => {
			const { id, type, anonymous } = e.currentTarget.dataset;

			// 관리자가 아닌데, 익명 글을 삭제하려면. 모달이 등장.
			if (!userData?.isAdmin && anonymous === 'true') {
				setDeleteCommentValue({ id, type });
				setIsDeleteModalOpen(true);
				return;
			}

			if (window.confirm('댓글을 삭제하십니까?')) {
				if (type === 'comment') {
					dispatch(deleteComment({ id }))
						.unwrap()
						.then(() =>
							setPostComments((prev) =>
								prev.filter((comment) => comment.id !== id)
							)
						);
				}

				if (type === 'reply') {
					dispatch(deleteReply({ id }))
						.unwrap()
						.then(() =>
							setPostComments((prev) =>
								prev.map((comment) => ({
									...comment,
									commentReplies: comment.commentReplies.filter(
										(reply) => reply.id !== id
									),
								}))
							)
						);
				}
			}
		},
		[dispatch, deleteComment, deleteReply, userData]
	);

	const [isAnonymousPw, setIsAnonymousPw] = useState('');

	const onClickModalCancel = useCallback(() => {
		setIsEditModalOpen(false);
		setIsAnonymousPw('');
	}, []);

	const onChangeAnonymousPw = useCallback((e) => {
		setIsAnonymousPw(e.target.value);
	}, []);

	const onSubmitAnonymous = useCallback(
		(e) => {
			e.preventDefault();
			const { type, anonymous, ...data } = editCommentValue;
			const withPassword = { ...data, password: isAnonymousPw };

			if (type === 'comment') {
				dispatch(patchComment(withPassword))
					.unwrap()
					.catch((msg) => callNotification({ type: 'danger', message: msg }));
			}

			if (type === 'reply') {
				dispatch(patchReply(withPassword))
					.unwrap()
					.catch((msg) => callNotification({ type: 'danger', message: msg }));
			}

			setEditCommentValue({ id: '', text: '', type: '', anonymous: '' });
			setIsEditModalOpen(false);
			setIsAnonymousPw('');
		},
		[
			callNotification,
			editCommentValue,
			dispatch,
			patchComment,
			isAnonymousPw,
			patchReply,
		]
	);

	const onSubmitAnonymousDelete = useCallback(
		(e) => {
			e.preventDefault();

			const { id, type } = deleteCommentValue;

			if (window.confirm('댓글을 삭제하십니까?')) {
				if (type === 'comment') {
					dispatch(deleteComment({ id, password: isAnonymousPw }))
						.unwrap()
						.catch((msg) => callNotification({ type: 'danger', message: msg }));
				}

				if (type === 'reply') {
					dispatch(deleteReply({ id, password: isAnonymousPw }))
						.unwrap()
						.catch((msg) => callNotification({ type: 'danger', message: msg }));
				}

				setDeleteCommentValue({ id: '', type: '' });
				setIsAnonymousPw('');
				setIsDeleteModalOpen(false);
			}
		},
		[
			dispatch,
			deleteCommentValue,
			isAnonymousPw,
			deleteComment,
			deleteReply,
			callNotification,
		]
	);

	console.log(postComments);

	return (
		<PostCommentStyle>
			<Modal isOpen={isDeleteModalOpen}>
				<form
					className='anonymous-form'
					onChange={onChangeAnonymousPw}
					onSubmit={onSubmitAnonymousDelete}
				>
					<p>비밀번호를 입력하세요.</p>
					<input
						type='text'
						name='password'
						autoComplete='off'
						placeholder='password'
					/>
					<div className='buttons'>
						<Button type='submit' color='primary'>
							확인
						</Button>
						<Button onClick={onClickModalCancel}>취소</Button>
					</div>
				</form>
			</Modal>

			<Modal isOpen={isEditModalOpen}>
				<form
					className='anonymous-form'
					onChange={onChangeAnonymousPw}
					onSubmit={onSubmitAnonymous}
				>
					<p>비밀번호를 입력하세요.</p>
					<input
						type='text'
						name='password'
						autoComplete='off'
						placeholder='password'
					/>
					<div className='buttons'>
						<Button type='submit' color='primary'>
							확인
						</Button>
						<Button onClick={onClickModalCancel}>취소</Button>
					</div>
				</form>
			</Modal>
			<div className='comment-container'>
				<div className='count'>{postComments.length}개의 댓글</div>

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

				{postComments.map((comment) => (
					<div className='comment-list' key={comment.id}>
						<div className='comment-box'>
							<div className='box-title'>
								<div className='user'>
									<div>{comment.username}</div>
									<div>{dayjs(comment.createdAt).format('YYYY-MM-DD')}</div>
								</div>
								{/* case 1. user is anonoymous */}
								{/* case 2. user is logged in my blog */}
								{/* case 3. user is admin. */}
								{comment.isAnonymous ? (
									<div className='etc'>
										<span
											data-id={comment.id}
											data-text={comment.text}
											data-type='comment'
											data-anonymous={comment.isAnonymous}
											onClick={onClickToChangeEditMode}
										>
											<BsPencil />
										</span>
										<span
											data-id={comment.id}
											data-type='comment'
											data-anonymous={comment.isAnonymous}
											onClick={onClickCommentDelete}
										>
											<MdDelete />
										</span>
									</div>
								) : userData?.id === comment.userId || userData?.isAdmin ? (
									<div className='etc'>
										<span
											data-id={comment.id}
											data-text={comment.text}
											data-type='comment'
											data-anonymous={comment.isAnonymous}
											onClick={onClickToChangeEditMode}
										>
											<BsPencil />
										</span>
										<span
											data-id={comment.id}
											data-type='comment'
											data-anonymous={comment.isAnonymous}
											onClick={onClickCommentDelete}
										>
											<MdDelete />
										</span>
									</div>
								) : null}
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
										<Button color='primary' onClick={onClickEditSubmit}>
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

											{reply.isAnonymous ? (
												<div className='etc'>
													<span
														data-id={reply.id}
														data-text={reply.text}
														data-type='reply'
														data-anonymous={reply.isAnonymous}
														onClick={onClickToChangeEditMode}
													>
														<BsPencil />
													</span>
													<span
														data-id={reply.id}
														data-type='reply'
														data-anonymous={reply.isAnonymous}
														onClick={onClickCommentDelete}
													>
														<MdDelete />
													</span>
												</div>
											) : userData?.id === reply.userId || userData?.isAdmin ? (
												<div className='etc'>
													<span
														data-id={reply.id}
														data-text={reply.text}
														data-type='reply'
														data-anonymous={reply.isAnonymous}
														onClick={onClickToChangeEditMode}
													>
														<BsPencil />
													</span>
													<span
														data-id={reply.id}
														data-type='reply'
														data-anonymous={reply.isAnonymous}
														onClick={onClickCommentDelete}
													>
														<MdDelete />
													</span>
												</div>
											) : null}
										</div>

										{editCommentValue.id === reply.id ? (
											<div className='comment-edit'>
												<textarea
													className='comment-input edit'
													onChange={onChangeEditComment}
													defaultValue={reply.text}
												/>
												<span>
													<Button color='primary' onClick={onClickEditSubmit}>
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
