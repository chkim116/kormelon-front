import { BsPlus } from 'react-icons/bs';
import { FiMinus } from 'react-icons/fi';

import { PostCommentStyle } from './PostStyle';

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
								<form>
									<textarea placeholder='답변을 작성하세요.' />
									{/* TODO: 로그인 안했을시만 오픈, 익명을 위함 */}
									<div className='anonymous'>
										<input type='text' placeholder='이름' />
										<input type='password' placeholder='비밀번호' />
									</div>
									<button type='submit'>답변 작성</button>
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
