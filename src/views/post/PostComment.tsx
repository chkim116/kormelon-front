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
		<>
			{comments.map((comment) => (
				<>
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

					{true && (
						<>
							{comment.commentReplies.map((reply) => (
								<>
									<div className='reply-user'>
										<div>{reply.username}</div>
										<div>{reply.createdAt}</div>
									</div>
									<div className='reply-text'>{reply.text}</div>
								</>
							))}
						</>
					)}
				</>
			))}
		</>
	);
};

export default PostComment;
