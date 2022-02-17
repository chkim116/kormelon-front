import DOMPurify from 'isomorphic-dompurify';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { marked } from 'marked';
import { useClickAway, useToggle } from 'react-use';
import { MdArrowRight } from 'react-icons/md';
import { useRouter } from 'next/router';

import Tag from 'src/components/Tag';
import Button from 'src/components/Button';
import Modal from 'src/components/Modal';
import PostWriteStyle from './PostWriteStyle';

import 'src/lib/highlight';

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

interface Post {
	parentCategory: string;
	category: string;
	title: string;
	content: string;
	tags: string[];
	isPrivate: boolean;
}

const PostWrite = () => {
	const router = useRouter();

	// query에 'edit={title}'이 존재하면 수정모드
	const isEditMode = useMemo(() => {
		return Boolean(router.query['edit']);
	}, [router]);

	const cascaderRef = useRef(null);
	const searchListRef = useRef(null);

	const [post, setPost] = useState<Post>({
		parentCategory: '',
		category: '',
		tags: [],
		title: '',
		content: '',
		isPrivate: false,
	});
	const [searchTagText, setSearchTagText] = useState('');
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

	const onChangeTitle = useCallback((e) => {
		const { value } = e.target;
		setPost((prev) => ({ ...prev, title: value }));
	}, []);

	const onChangeContent = useCallback((e) => {
		const { value } = e.target;
		setPost((prev) => ({ ...prev, content: value }));
	}, []);

	const onClickParentCategory = useCallback((e) => {
		const { value } = e.currentTarget.dataset;

		setPost((prev) => ({ ...prev, parentCategory: value }));
	}, []);

	const onClickSubCategory = useCallback(
		(e) => {
			e.stopPropagation();
			const { value } = e.currentTarget.dataset;

			setPost((prev) => ({ ...prev, category: value }));
			toggleCascader(false);
		},
		[toggleCascader]
	);

	const onClickToggleCascader = useCallback(() => {
		toggleCascader();
	}, [toggleCascader]);

	const onChangeSearchTag = useCallback(
		(e) => {
			const { value } = e.target;
			setSearchTagText(value);
			toggleSearchList(!!value);
		},
		[toggleSearchList]
	);

	const onClickAddTag = useCallback(
		(e) => {
			const { value } = e.target.dataset;
			toggleSearchList(false);

			setSearchTagText('');
			setPost((prev) => ({ ...prev, tags: [...prev.tags, value] }));
		},
		[toggleSearchList]
	);

	const onClickDeleteTag = useCallback((e) => {
		const { value } = e.target.dataset;

		setPost((prev) => ({
			...prev,
			tags: prev.tags.filter((tag) => tag !== value),
		}));
	}, []);

	const onClickSavePost = useCallback(() => {}, []);

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
				<input
					onChange={onChangeTitle}
					value={post.title}
					className='title'
					type='text'
					placeholder='제목을 입력하세요.'
				/>

				{/* category */}
				<div className='cascader' ref={cascaderRef}>
					<button type='button' onClick={onClickToggleCascader}>
						{post.parentCategory && post.category
							? `${post.parentCategory} > ${post.category}`
							: '카테고리를 설정해 주세요.'}
					</button>

					{isCascaderOpen && (
						<ul className='category'>
							{categoryOptions.map((option) => (
								<li
									key={option.id}
									className={`category-list ${
										post.parentCategory === option.value ? 'active' : ''
									}`}
									data-value={option.value}
									onClick={onClickParentCategory}
								>
									<div>
										{option.value}
										{option.categories.length && (
											<span>
												<MdArrowRight />
											</span>
										)}
									</div>

									{/* 선택한 카테고리만 노출 */}
									{post.parentCategory === option.value &&
									option.categories.length ? (
										<ul className='sub-category'>
											{option.categories.map((sub) => (
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
					<input
						type='text'
						placeholder='태그를 입력하세요.'
						value={searchTagText}
						onChange={onChangeSearchTag}
					/>
					<div className='tags-list'>
						{post.tags.map((tag) => (
							<Tag key={tag} data-value={tag} onClick={onClickDeleteTag}>
								{tag}
							</Tag>
						))}
					</div>

					{/* TODO: 태그 서칭 */}
					{isSearchListOpen && (
						<ul className='tag-search' ref={searchListRef}>
							{tags.filter((tag) => !post.tags.includes(tag.value)).length ? (
								tags.map((tag) => (
									<li
										key={tag.id}
										tabIndex={0}
										data-value={tag.value}
										onClick={onClickAddTag}
									>
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
							onChange={onChangeContent}
							value={post.content}
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
						<Button type='button' onClick={onClickSavePost}>
							임시저장
						</Button>
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
