import styled from '@emotion/styled';

import { marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';

import Tag from 'src/components/Tag';

import 'src/lib/highlight';
import Button from 'src/components/Button';

const options = [
	{
		value: 'chocolate',
		label: 'Chocolate',
		children: [
			{
				label: '1',
				value: '1',
			},
		],
	},
	{ value: 'strawberry', label: 'Strawberry' },
	{ value: 'vanilla', label: 'Vanilla' },
];

const PostWrite = () => {
	return (
		<PostWriteStyle>
			<form>
				{/* title */}
				<input className='title' type='text' placeholder='제목을 입력하세요.' />

				{/* category */}
				{/* <div
					className='category'
					options={options}
					placeholder='카테고리를 선택하세요.'
				/> */}

				{/* Tag */}
				<input className='tag' type='text' placeholder='태그를 입력하세요.' />
				<div className='tags-container'>
					<Tag href='/1'>태그1</Tag>
					<Tag href='/2'>태그2</Tag>
				</div>

				{/* content */}
				<div className='content-container'>
					<button className='preview-btn' type='button'>
						미리볼래?
					</button>
					<div>
						<textarea
							className='content'
							spellCheck='false'
							placeholder='본문을 입력하세요.'
						/>
						<div
							className='preview'
							dangerouslySetInnerHTML={{
								__html: DOMPurify.sanitize(
									marked.parse('```js\nconst a = 3;\n```')
								),
							}}
						/>
					</div>
				</div>

				{/* 제출 */}
				<div className='footer'>
					<div>
						<Button type='button'>비밀</Button>
						<Button type='button'>임시저장</Button>
					</div>
					<Button color='primary' type='submit'>
						작성완료
					</Button>
				</div>
			</form>
		</PostWriteStyle>
	);
};

export default PostWrite;

const PostWriteStyle = styled.div`
	max-width: 1000px;
	width: 100%;

	form {
		padding-bottom: 100px;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;

		input,
		textarea {
			background-color: ${({ theme }) => theme.colors.primary};
			color: ${({ theme }) => theme.colors.onPrimary};
		}

		.title {
			max-width: 600px;
			width: 100%;
			padding: 8px 0;
			border: none;
			border-bottom: 1px solid ${({ theme }) => theme.colors.border};
			font-size: ${({ theme }) => theme.fontSizes.lg};
			margin-bottom: 12px;
		}

		.category {
		}

		.tag {
			padding: 8px 0;
			border: none;
			border-bottom: 1px solid ${({ theme }) => theme.colors.border};
			margin-bottom: 24px;
		}

		.tags-container {
			display: flex;
			gap: 8px;
		}

		.content-container {
			padding: 24px 0;
			width: 100%;
			display: flex;
			flex-direction: column;

			.preview-btn {
				@media all and (max-width: 800px) {
					display: none;
				}

				padding: 4px 8px;
				width: fit-content;
				border-radius: 4px;
				margin-left: auto;
				margin-bottom: 8px;
				background-color: ${({ theme }) => theme.colors.blue};
				color: ${({ theme }) => theme.colors.primary};
			}

			& > div {
				width: 100%;
				display: flex;
				gap: 8px;

				.content {
					width: 100%;
					height: 80vh;
					padding: 8px;
					font-size: ${({ theme }) => theme.fontSizes.md};
				}

				.preview {
					@media all and (max-width: 800px) {
						display: none;
					}
					width: 100%;
					height: 80vh;
					padding: 8px;
					border: 1px solid ${({ theme }) => theme.colors.border};
					font-size: ${({ theme }) => theme.fontSizes.md};
				}
			}
		}

		.footer {
			display: flex;
			justify-content: space-between;
			gap: 4px;

			button {
				width: 80px;

				&[type='submit'] {
				}

				&[type='button'] {
				}
			}

			& > div {
				display: flex;
				gap: 4px;
			}
		}
	}
`;
