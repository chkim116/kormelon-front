/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
	removeFocusCommentId,
} from 'src/store/comment';
import { useAppDispatch, useAppSelector } from 'src/store/config';

import { PostCommentStyle } from './PostStyle';

export interface CommentReply {
	id: string;
	text: string;
	userId: string | null;
	username: string;
	userImage: string;
	isAnonymous: boolean;
	createdAt: string;
}
export interface Comment {
	id: string;
	text: string;
	userId: string | null;
	username: string;
	userImage: string;
	createdAt: string;
	deletedAt: string | null;
	isAnonymous: boolean;
	commentReplies: CommentReply[];
}

interface CommentValue {
	id: string;
	type: 'comment' | 'reply' | '';
	text: string;
}

const PostComment = () => {
	const dispatch = useAppDispatch();
	const { userData } = useAppSelector((state) => state.user);
	const { comments } = useAppSelector((state) => state.post.post);
	const { focusId } = useAppSelector((state) => state.comment);
	const { query } = useRouter();
	const { callNotification } = useNotification();

	const focusIdByQuery = useMemo(
		() => focusId || query.target,
		[focusId, query.target]
	);
	const isLogged = useMemo(() => !!userData?.id, [userData?.id]);

	const focusCommentRef = useRef<HTMLDivElement | null>(null);
	const focusingComment = useCallback(() => {
		const { current: focusComment } = focusCommentRef;
		if (focusComment) {
			focusComment.scrollIntoView({ block: 'center' });
			focusComment.classList.add('focus');

			setTimeout(() => {
				focusComment.classList.remove('focus');
			}, 1500);
		}
	}, []);
	// ?????? ????????? ????????? ??? ??????
	const [isReaded, setIsReaded] = useState(false);

	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [isOpenReplyids, setIsOpenReplyIds] = useState<string[]>([]);
	const [commentValues, setCommentValues] = useState<CommentValue[]>([]);

	const commentText = useMemo(() => {
		return (
			commentValues.find((comment) => comment.type === 'comment')?.text || ''
		);
	}, [commentValues]);

	const commentReplyText = useCallback(
		(commentId: string) => {
			const commentReplies = commentValues.filter(
				(comment) => comment.type === 'reply'
			);

			return (
				// reply?????? ?????????, id??? comment.id??? ?????? ?????????
				// ????????? comment.id === commentId??????.
				commentReplies.find((reply) => reply.id === commentId)?.text || ''
			);
		},
		[commentValues]
	);

	const [anonymousUser, setAnonymousUser] = useState({
		username: '??????',
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

	// ?????? ?????????
	const onSubmitForm = useCallback(
		(e) => {
			e.preventDefault();
			const { id } = e.target.dataset;

			// ????????? ?????? ?????? ?????? ?????????
			if (!commentValues.find((value) => value.id === id)?.text) {
				return callNotification({
					type: 'danger',
					message: '?????? ????????? ?????????.',
				});
			}

			const commentValue = commentValues.find((value) => value.id === id);

			if (!commentValue) {
				return callNotification({
					type: 'danger',
					message: '?????? ?????????. ???????????? ??? ????????? ?????????.',
				});
			}
			// ?????? ???????????? ??????. ????????? ???????????? ???????????? ??????.
			const toCreateData = Object.assign(
				{
					id: commentValue.id,
					text: commentValue.text,
				},
				userData?.id ? {} : anonymousUser
			);

			if (commentValue.type === 'comment') {
				dispatch(postCreateComment(toCreateData));

				// ?????? ?????? ?????? ??????
				setCommentValues((prev) =>
					prev.filter((comment) => comment.type !== 'comment')
				);
			}

			if (commentValue.type === 'reply') {
				dispatch(postCreateReply(toCreateData));

				// ????????? ?????? ?????? ??????
				setCommentValues((prev) =>
					prev.filter((comment) => comment.id !== toCreateData.id)
				);
			}
		},
		[dispatch, commentValues, anonymousUser, userData?.id, callNotification]
	);

	// * ?????? ?????? ?????? ??????
	const onChangeEditComment = useCallback((e) => {
		setEditCommentValue((prev) => ({ ...prev, text: e.target.value }));
	}, []);

	// * ?????? ?????? ?????? ???
	const onClickToChangeEditMode = useCallback((e) => {
		const { id, text, type, anonymous } = e.currentTarget.dataset;

		setEditCommentValue({ id, text, type, anonymous });
	}, []);

	// * ?????? ?????? ??????
	const onClickEditCancel = useCallback(() => {
		setEditCommentValue({ id: '', text: '', type: '', anonymous: '' });
	}, []);

	// * ?????? ??????
	const onClickEditSubmit = useCallback(() => {
		const { type, anonymous, ...data } = editCommentValue;

		if (!userData?.isAdmin && anonymous === 'true') {
			return setIsEditModalOpen(true);
		}

		if (type === 'comment') {
			dispatch(patchComment(data));
		}

		if (type === 'reply') {
			dispatch(patchReply(data));
		}

		setEditCommentValue({ id: '', text: '', type: '', anonymous: '' });
	}, [editCommentValue, userData?.isAdmin, dispatch]);

	// * ?????? ?????? ?????? ???
	const onClickCommentDelete = useCallback(
		(e) => {
			const { id, type, anonymous } = e.currentTarget.dataset;

			// ???????????? ?????????, ?????? ?????? ???????????????. ????????? ??????.
			if (!userData?.isAdmin && anonymous === 'true') {
				setDeleteCommentValue({ id, type });
				setIsDeleteModalOpen(true);
				return;
			}

			if (window.confirm('????????? ???????????????????')) {
				if (type === 'comment') {
					dispatch(deleteComment({ id }));
				}

				if (type === 'reply') {
					dispatch(deleteReply({ id }));
				}
			}
		},
		[dispatch, userData?.isAdmin]
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
				dispatch(patchComment(withPassword));
			}

			if (type === 'reply') {
				dispatch(patchReply(withPassword));
			}

			setEditCommentValue({ id: '', text: '', type: '', anonymous: '' });
			setIsEditModalOpen(false);
			setIsAnonymousPw('');
		},
		[editCommentValue, dispatch, isAnonymousPw]
	);

	const onSubmitAnonymousDelete = useCallback(
		(e) => {
			e.preventDefault();

			const { id, type } = deleteCommentValue;

			if (window.confirm('????????? ???????????????????')) {
				if (type === 'comment') {
					dispatch(deleteComment({ id, password: isAnonymousPw }));
				}

				if (type === 'reply') {
					dispatch(deleteReply({ id, password: isAnonymousPw }));
				}

				setDeleteCommentValue({ id: '', type: '' });
				setIsAnonymousPw('');
				setIsDeleteModalOpen(false);
			}
		},
		[dispatch, deleteCommentValue, isAnonymousPw]
	);

	// ?????? or ????????? ????????? ?????????
	useEffect(() => {
		if (focusId) {
			new Promise(() => {
				focusingComment();
			}).then(() => {
				dispatch(removeFocusCommentId());
			});
		}
	}, [dispatch, focusId, focusingComment]);

	// ???????????? ?????? ??? ?????? or ????????? ?????????
	useEffect(() => {
		if (isReaded || !query.target) return;

		if (query.type === 'reply') {
			const openComment = comments.find((comment) =>
				comment.commentReplies.find((reply) => reply.id === query.target)
			);

			if (!openComment) return;

			new Promise((resolve) => {
				resolve(
					setIsOpenReplyIds((prev) => {
						if (!prev.length) {
							return [openComment.id];
						}

						if (prev.includes(openComment.id)) {
							return prev;
						}

						return [...prev, openComment.id];
					})
				);
			}).then(() => {
				focusingComment();
			});
		}

		if (query.type === 'comment') {
			focusingComment();
		}

		setIsReaded(true);
	}, [comments, focusingComment, isReaded, query.target, query.type]);

	return (
		<PostCommentStyle>
			<Modal isOpen={isDeleteModalOpen}>
				<form
					className='anonymous-form'
					onChange={onChangeAnonymousPw}
					onSubmit={onSubmitAnonymousDelete}
				>
					<p>??????????????? ???????????????.</p>
					<input
						type='text'
						name='password'
						autoComplete='off'
						placeholder='password'
					/>
					<div className='buttons'>
						<Button type='submit' color='primary'>
							??????
						</Button>
						<Button onClick={onClickModalCancel}>??????</Button>
					</div>
				</form>
			</Modal>

			<Modal isOpen={isEditModalOpen}>
				<form
					className='anonymous-form'
					onChange={onChangeAnonymousPw}
					onSubmit={onSubmitAnonymous}
				>
					<p>??????????????? ???????????????.</p>
					<input
						type='text'
						name='password'
						autoComplete='off'
						placeholder='password'
					/>
					<div className='buttons'>
						<Button type='submit' color='primary'>
							??????
						</Button>
						<Button onClick={onClickModalCancel}>??????</Button>
					</div>
				</form>
			</Modal>
			<div className='comment-container'>
				<div className='count'>{comments.length}?????? ??????</div>

				{/* ?????? */}
				<form onSubmit={onSubmitForm} data-id={query.id}>
					<textarea
						onChange={onChangeForm}
						value={commentText}
						className='comment-input'
						name='comment'
						placeholder='????????? ???????????????.'
						data-id={query.id}
					/>
					{/* ????????? ??????????????? ??????, ?????? ????????? ?????? */}
					{isLogged ? null : (
						<div className='anonymous'>
							<input
								onChange={onChangeForm}
								type='text'
								placeholder='??????'
								name='username'
								autoComplete='username'
								defaultValue={anonymousUser.username}
							/>
							<input
								onChange={onChangeForm}
								type='password'
								placeholder='????????????'
								name='password'
								autoComplete='current-password'
								defaultValue={anonymousUser.password}
							/>
						</div>
					)}
					<Button type='submit' color='primary'>
						?????? ??????
					</Button>
				</form>
				{comments.map((comment) => (
					<div className='comment-list' key={comment.id}>
						<div
							className='comment-box'
							ref={comment.id === focusIdByQuery ? focusCommentRef : null}
						>
							<div className='box-title'>
								<div className='user'>
									<div>
										<img src={comment.userImage} alt='user image' />
										<span>{comment.username}</span>
									</div>
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
								) : !comment.deletedAt &&
								  (userData?.id === comment.userId || userData?.isAdmin) ? (
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

							{/* ????????? textarea??? */}
							{editCommentValue.id === comment.id ? (
								<div className='comment-edit'>
									<textarea
										value={editCommentValue.text}
										className='comment-input edit'
										onChange={onChangeEditComment}
									/>
									<span>
										<Button color='primary' onClick={onClickEditSubmit}>
											??????
										</Button>
										<Button onClick={onClickEditCancel}>??????</Button>
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
										{comment.commentReplies.length}?????? ??????
									</button>
								</div>
							</div>
						</div>

						{/* ????????? */}
						{isOpenReplyids.includes(comment.id) && (
							<div className='reply-box'>
								<form onSubmit={onSubmitForm} data-id={comment.id}>
									<textarea
										onChange={onChangeForm}
										value={commentReplyText(comment.id)}
										className='comment-input'
										name='reply'
										placeholder='????????? ???????????????.'
										data-id={comment.id}
									/>
									{/* ????????? ??????????????? ??????, ?????? ????????? ?????? */}
									{isLogged ? null : (
										<div className='anonymous'>
											<input
												type='text'
												placeholder='??????'
												name='username'
												autoComplete='username'
												onChange={onChangeForm}
												defaultValue={anonymousUser.username}
											/>
											<input
												type='password'
												placeholder='????????????'
												name='password'
												autoComplete='current-password'
												onChange={onChangeForm}
												defaultValue={anonymousUser.password}
											/>
										</div>
									)}
									<Button color='primary' type='submit'>
										?????? ??????
									</Button>
								</form>

								{comment.commentReplies.map((reply) => (
									<div
										className='comment-box'
										key={reply.id}
										ref={reply.id === focusIdByQuery ? focusCommentRef : null}
									>
										<div className='box-title'>
											<div className='user'>
												<div>
													<img src={reply.userImage} alt='user image' />
													<span>{reply.username}</span>
												</div>
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
													value={editCommentValue.text}
												/>
												<span>
													<Button color='primary' onClick={onClickEditSubmit}>
														??????
													</Button>
													<Button onClick={onClickEditCancel}>??????</Button>
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
