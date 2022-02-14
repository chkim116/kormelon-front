import styled from '@emotion/styled';
import dayjs from 'dayjs';
import DOMPurify from 'isomorphic-dompurify';
import Link from 'next/link';
import { marked } from 'marked';
import 'src/lib/highlight';

const Post = () => {
	const post = {
		id: '1',
		title:
			'제목입니다다다다다다다ㅏ따ㅏㄷ?목입니다다다다다다다ㅏ따ㅏㄷ목입니다다다다다다다ㅏ따ㅏㄷ목입니다다다다다다다ㅏ따ㅏㄷ',
		content:
			'# Marked in the browser\n\nRendered by **marked**.\n\n  ```js \n function abs () { 	\nreturn null \n}  \nfunction a () { \nreturn null\n }\n const ab = 123;\n```',
		category: '공지사항',
		tags: ['태그1', '태그2'],
		createdAt: dayjs().format('YYYY-MM-DD'),
		readTime: '3 min to read',
	};

	return (
		<PostStyle>
			<div className='post'>
				<h1 className='title'>{post.title}</h1>
				<div className='category'>{post.category}</div>
				<div className='info'>
					<small>{post.createdAt}</small>
					<span className='separator'>·</span>
					<small>{post.readTime}</small>
				</div>

				<div className='tags'>
					{post.tags.map((tag) => (
						// TODO: tag link..
						<Link href='/tag' key={tag}>
							{tag}
						</Link>
					))}
				</div>

				<div
					className='content'
					dangerouslySetInnerHTML={{
						__html: DOMPurify.sanitize(marked.parse(post.content)),
					}}
				/>

				<pre>
					<code>function a ( {})</code>
				</pre>
			</div>
			{/* TODO: 실제 h1 */}
			<div className='anchors'>
				<a href='/#'>sadsadsaldk;askd;sakd;lsakdas</a>
				<a href='/#'>h1</a>
				<a href='/#'>h1</a>
				<a href='/#'>h1</a>
			</div>
		</PostStyle>
	);
};

export default Post;

const PostStyle = styled.div`
	display: flex;
	width: 100%;

	.anchors {
		display: flex;
		width: 200px;
		flex-direction: column;
		gap: 12px;
		padding-left: 40px;
		padding-top: 24px;

		@media all and (max-width: 900px) {
			display: none;
		}
	}

	.post {
		width: 800px;

		h1,
		h2,
		h3,
		h4 {
			margin-bottom: 12px;
		}

		.title {
		}

		.category {
			margin-bottom: 8px;
		}

		.separator {
			margin: 0 4px;
		}

		.tags {
			display: flex;
			gap: 8px;
			padding: 12px 0;
			a {
				background-color: #d7d7d71a;
				padding: 6px 12px;
				font-size: ${({ theme }) => theme.fontSizes.sm};
			}
		}

		.content {
			padding: 24px 0;
		}

		code {
			padding: 2px 6px;
			border-radius: 8px;
			background-color: #d7d7d71a;
		}

		/* code.. */
		pre {
			margin: 12px 0;
			padding: 12px;
			background-color: #17181b;
			box-shadow: 2px 2px 4px #212227;

			code {
				background-color: transparent;
			}
		}
	}
`;
