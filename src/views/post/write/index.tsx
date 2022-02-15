import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';
import { useClickAway, useToggle } from 'react-use';

import Tag from 'src/components/Tag';

import 'src/lib/highlight';
import Button from 'src/components/Button';
import { MdArrowRight } from 'react-icons/md';
import Modal from 'src/components/Modal';
import { useRouter } from 'next/router';

const categoryOptions = Array.from({ length: 10 }).map((_, i) => ({
	id: i.toString(),
	value: i.toString(),
	categories: Array.from({ length: Math.round(Math.random() * 3) }).map(
		(_, i) => ({
			id: (i + i).toString(),
			value: (i + i).toString(),
		})
	),
}));

const tags = [
	{
		id: 1,
		value: '자바스크립트',
		posts: [1, 2],
	},
	{
		id: 2,
		value: '리액트',
		posts: [1],
	},
];

const PostWrite = () => {
	const router = useRouter();

	// query에 'edit={title}'이 존재하면 수정모드
	const isEditMode = useMemo(() => {
		return Boolean(router.query['edit']);
	}, [router]);

	const cascaderRef = useRef(null);
	const searchListRef = useRef(null);
	const [categoryName, setCategoryName] = useState('');
	const [isCascaderOpen, toggleCascader] = useToggle(false);
	const [isSearchListOpen, toggleSearchList] = useToggle(false);
	const [isPreviewOpen, onClickTogglePreview] = useToggle(true);
	const [isSaveList, openSaveList] = useToggle(false);

	const onClickOpenSaveList = useCallback(() => {
		openSaveList(true);
	}, [openSaveList]);

	const onClickSaveList = useCallback((e) => {
		const { value } = e.target.dataset;
		console.log(value);
	}, []);

	const onClickCategory = useCallback((e) => {
		const { value } = e.currentTarget.dataset;

		setCategoryName(value);
		console.log(value);
	}, []);

	const onClickSubCategory = useCallback(
		(e) => {
			const { value } = e.currentTarget.dataset;

			console.log(value);
			toggleCascader(false);
		},
		[toggleCascader]
	);

	const onClicktoggleCascader = useCallback(() => {
		toggleCascader();
	}, [toggleCascader]);

	const onClickTag = useCallback(() => {
		toggleSearchList(false);
	}, [toggleSearchList]);

	// 카테고리 캐스케이더를 끄기 위함.
	useClickAway(cascaderRef, () => toggleCascader(false));
	useClickAway(searchListRef, () => toggleSearchList(false));

	// 임시 저장 목록을 끄기 위함
	useEffect(() => {
		if (isSaveList) {
			document.body.addEventListener('click', openSaveList);
		}

		return () => {
			if (isSaveList) {
				document.body.removeEventListener('click', openSaveList);
			}
		};
	}, [isSaveList, openSaveList]);

	return (
		<PostWriteStyle>
			<div className='save-loader'>
				<Button onClick={onClickOpenSaveList}>저장 목록 불러오기</Button>
			</div>

			<Modal isOpen={isSaveList}>
				{/* TODO: 로컬 스토리지로 연동 */}
				<ul className='load-list' onClick={onClickSaveList}>
					<li data-value={'1'}>제목ㅇㅂㅈㅇㅂㅈㅇㅈㅂ</li>
					<li data-value={'2'}>제목ㅇㅂㅈㅇㅂㅈㅇㅈㅂ</li>
					<li data-value={'3'}>제목ㅇㅂㅈㅇㅂㅈㅇㅈㅂ</li>
				</ul>
			</Modal>

			<form>
				{/* title */}
				<input className='title' type='text' placeholder='제목을 입력하세요.' />

				{/* category */}
				<div className='cascader' ref={cascaderRef}>
					<button type='button' onClick={onClicktoggleCascader}>
						카테고리를 설정해 주세요.
					</button>

					{isCascaderOpen && (
						<ul className='category'>
							{categoryOptions.map((category) => (
								<li
									key={category.id}
									className={`category-list ${
										categoryName === category.value ? 'active' : ''
									}`}
									data-value={category.value}
									onClick={onClickCategory}
								>
									<div>
										{category.value}
										{category.categories.length && (
											<span>
												<MdArrowRight />
											</span>
										)}
									</div>

									{/* 선택한 카테고리만 노출 */}
									{categoryName === category.value &&
									category.categories.length ? (
										<ul className='sub-category'>
											{category.categories.map((sub) => (
												<li
													key={sub.id}
													onClick={onClickSubCategory}
													data-value={sub.value}
												>
													{sub.value}
												</li>
											))}
										</ul>
									) : null}
								</li>
							))}
						</ul>
					)}
				</div>

				{/* Tag */}
				<div className='tag-container'>
					<input type='text' placeholder='태그를 입력하세요.' />
					<div className='tags-list'>
						<Tag>태그1</Tag>
						<Tag>태그2</Tag>
					</div>

					{/* TODO: 태그 서칭 */}
					{isSearchListOpen && (
						<ul className='tag-search' ref={searchListRef}>
							{tags.length ? (
								tags.map((tag) => (
									<li key={tag.id} tabIndex={0} onClick={onClickTag}>
										{tag.value}
										<small>({tag.posts.length})</small>
									</li>
								))
							) : (
								<li>
									<small>검색된 태그가 없습니다.</small>
								</li>
							)}
						</ul>
					)}
				</div>

				{/* content */}
				<div className='content-container'>
					<button
						className='preview-btn'
						type='button'
						onClick={onClickTogglePreview}
					>
						{isPreviewOpen ? '미리보기 제거' : '미리보기'}
					</button>
					<div>
						<textarea
							className='content'
							spellCheck='false'
							placeholder='본문을 입력하세요.'
						/>
						{isPreviewOpen && (
							<div
								className='preview'
								dangerouslySetInnerHTML={{
									__html: DOMPurify.sanitize(
										marked.parse('```js\nconst a = 3;\n```')
									),
								}}
							/>
						)}
					</div>
				</div>

				{/* 제출 */}
				<div className='footer'>
					<div>
						<Button type='button'>비밀</Button>
						<Button type='button'>임시저장</Button>
					</div>
					<Button color='primary' type='submit'>
						{isEditMode ? '수정완료' : '작성완료'}
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

	/* 임시 저장 목록 */
	.save-loader {
		width: 100%;
		display: flex;
		justify-content: flex-end;
		margin-bottom: 20px;
	}

	.modal-body {
		max-width: 500px;
		width: 100%;
	}

	.load-list {
		display: flex;
		flex-direction: column;
		width: 100%;
		gap: 14px;

		li {
			text-align: left;
			padding: 12px 0;
			cursor: pointer;
			border-bottom: 1px solid ${({ theme }) => theme.colors.border};

			&:hover {
				opacity: 0.7;
			}
		}
	}

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

		.cascader {
			position: relative;
			margin-bottom: 12px;
			z-index: 10;

			button {
				width: 100%;
				text-align: left;
				padding: 8px 0;
				color: ${({ theme }) => theme.colors.onPrimary};
				border-bottom: 1px solid ${({ theme }) => theme.colors.border};
			}
			.category {
				position: absolute;

				.category-list {
					display: flex;
					position: relative;
					font-size: ${({ theme }) => theme.fontSizes.md};
					width: fit-content;

					&.active {
						border-left: 1px solid ${({ theme }) => theme.colors.blue};
					}

					& > div {
						display: flex;
						align-items: center;
						justify-content: space-between;
						background-color: ${({ theme }) => theme.colors.primary};
						color: ${({ theme }) => theme.colors.onPrimary};
						width: 200px;
						padding: 8px 6px;
						cursor: pointer;
						border: 1px solid ${({ theme }) => theme.colors.border};
						&:hover {
							background-color: ${({ theme }) => theme.colors.onBlue};
						}
					}

					.sub-category {
						position: absolute;
						left: 200px;
						background-color: ${({ theme }) => theme.colors.primary};
						color: ${({ theme }) => theme.colors.onPrimary};
						max-width: 200px;
						width: 100%;
						border: 1px solid ${({ theme }) => theme.colors.border};

						li {
							cursor: pointer;
							padding: 10px 6px;

							&:hover {
								background: ${({ theme }) => theme.colors.onBlue};
							}
						}

						li ~ li {
							border-top: 1px solid ${({ theme }) => theme.colors.border};
						}
					}
				}
			}
		}

		.tag-container {
			position: relative;
			input {
				padding: 8px 0;
				border: none;
				border-bottom: 1px solid ${({ theme }) => theme.colors.border};
				margin-bottom: 24px;
				width: 150px;
			}

			.tags-list {
				display: flex;
				gap: 8px;
				width: 120px;
			}

			.tag-search {
				position: absolute;
				top: 40px;
				min-width: 150px;
				background-color: ${({ theme }) => theme.colors.primary};
				color: ${({ theme }) => theme.colors.onPrimary};
				border: 1px solid ${({ theme }) => theme.colors.border};

				li {
					cursor: pointer;
					display: flex;
					justify-content: space-between;
					gap: 12px;
					padding: 12px;

					&:hover {
						opacity: 0.56;
					}
				}

				li ~ li {
					border-top: 1px solid ${({ theme }) => theme.colors.border};
				}
			}
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
