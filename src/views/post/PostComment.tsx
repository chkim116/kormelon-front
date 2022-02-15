import styled from '@emotion/styled';
import { BsPlus } from 'react-icons/bs';
import { FiMinus } from 'react-icons/fi';

interface Comment {
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
	return (
		<PostCommentStyle>
			<div className='comment-container'>
				<div className='count'>{comments.length}개의 댓글</div>
				<form>
					<textarea placeholder='댓글을 작성하세요.' />
					{/* TODO: 로그인 안했을시만 오픈, 익명을 위함 */}
					<div className='anonymous'>
						<input type='text' placeholder='이름' />
						<input type='password' placeholder='비밀번호' />
					</div>
					<button type='submit'>댓글 작성</button>
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
								<span>{true ? <FiMinus /> : <BsPlus />}</span>
								<button type='button'>
									{comment.commentReplies.length}개의 답글
								</button>
							</div>
						</div>

						{/* TODO: 여부에 따른 hide */}
						{true && (
							<div className='reply-box'>
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

const PostCommentStyle = styled.div`
	.comment-container {
		width: 100%;
		padding: 24px 0;
		display: flex;
		flex-direction: column;

		.count {
			margin: 8px 0;
		}

		form {
			display: flex;
			flex-direction: column;
			margin: 8px 0;

			.anonymous {
				display: flex;
				justify-content: flex-end;
				margin-top: 4px;
				gap: 2px;

				input {
					padding: 4px 8px;
					outline: none;
					border-radius: 4px;
					background-color: ${({ theme }) => theme.colors.primary};
					border: 1px solid ${({ theme }) => theme.colors.border};
					color: ${({ theme }) => theme.colors.onPrimary};
				}
			}
			textarea {
				width: 100%;
				resize: none;
				padding: 8px;
				height: 100px;
				border-radius: 4px;
				outline: none;
				font-size: ${({ theme }) => theme.fontSizes.md};
				color: ${({ theme }) => theme.colors.onPrimary};
				background-color: ${({ theme }) => theme.colors.primary};
				border: 1px solid ${({ theme }) => theme.colors.border};
			}

			button {
				width: fit-content;
				margin-top: 8px;
				margin-left: auto;
				padding: 8px 12px;
				border-radius: 4px;
				background-color: ${({ theme }) => theme.colors.blue};
				color: ${({ theme }) => theme.colors.primary};
				font-size: ${({ theme }) => theme.fontSizes.sm};
			}
		}
	}

	.comment-list {
		border-bottom: 1px solid ${({ theme }) => theme.colors.border};
		margin-bottom: 40px;
	}

	.comment-box {
		margin: 25px 0;
		width: 100%;

		.user {
			div:nth-of-type(1) {
				font-weight: 700;
			}
			div:nth-of-type(2) {
				margin: 8px 0;
				font-size: ${({ theme }) => theme.fontSizes.sm};
			}
		}

		.text {
			padding: 8px 0;
			font-size: ${({ theme }) => theme.fontSizes.md};
		}

		.reply-btn {
			display: flex;
			justify-content: flex-end;
			align-items: center;
			color: ${({ theme }) => theme.colors.onPrimary};

			svg {
				cursor: pointer;
				background-color: #d7d7d71a;
			}

			button {
				color: ${({ theme }) => theme.colors.onBlue};

				&:hover {
					text-decoration: underline;
				}
			}
		}
	}

	.reply-box {
		padding-left: 10px;
	}
`;
