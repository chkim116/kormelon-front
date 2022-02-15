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
				<Fragment key={comment.id}>
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
						<>
							{comment.commentReplies.map((reply) => (
								<div className='reply-box' key={reply.id}>
									<div className='reply-user'>
										<div>{reply.username}</div>
										<div>{reply.createdAt}</div>
									</div>
									<div className='reply-text'>{reply.text}</div>
								</div>
							))}
						</>
					)}
				</Fragment>
			))}
		</PostCommentStyle>
	);
};

export default PostComment;

const PostCommentStyle = styled.div`
	.comment-box {
		.user {
		}

		.text {
		}
		.reply-btn {
		}
	}

	.reply-box {
		.reply-user {
		}
		.reply-text {
		}
	}
`;
