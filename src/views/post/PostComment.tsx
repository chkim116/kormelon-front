import styled from '@emotion/styled';
import { Fragment } from 'react';
import { BsPlus } from 'react-icons/bs';

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
			{comments.map((comment) => (
				<div className='wrap' key={comment.id}>
					<div className='comment-box'>
						<div className='user'>
							<div>{comment.username}</div>
							<div>{comment.createdAt}</div>
						</div>
						<div className='text'>{comment.text}</div>

						<div className='reply-btn'>
							<span>
								<BsPlus />
							</span>
							<button type='button'>
								{comment.commentReplies.length}개의 답글
							</button>
						</div>
					</div>

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
		</PostCommentStyle>
	);
};

export default PostComment;

const PostCommentStyle = styled.div`
	.wrap {
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
