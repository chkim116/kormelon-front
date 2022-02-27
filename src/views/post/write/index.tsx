import DOMPurify from 'isomorphic-dompurify';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { marked } from 'marked';
import { useClickAway, useToggle } from 'react-use';
import { MdArrowRight, MdDeleteForever } from 'react-icons/md';
import { useRouter } from 'next/router';

import Tag from 'src/components/Tag';
import Button from 'src/components/Button';
import Modal from 'src/components/Modal';
import PostWriteStyle from './PostWriteStyle';

import { ALLOWED_TAGS, ALLOWED_URI_REGEXP } from 'src/lib/domPurifyConfig';
import 'src/lib/markedConfig';
import { useNotification } from 'src/hooks/useNotification';
import { api } from 'src/lib/api';
import { useAppSelector } from 'src/store/config';

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
	id: string;
	parentCategory: string;
	category: string;
	title: string;
	content: string;
	tags: string[];
	isPrivate: boolean;
}

interface SavePost extends Post {
	saveId: number;
}

DOMPurify.setConfig({
	ALLOWED_TAGS,
	ALLOWED_URI_REGEXP,
});

const PostWrite = () => {
	const router = useRouter();
	const { callNotification } = useNotification();
	const { categories } = useAppSelector((state) => state.category);

	// query에 'edit={title}'이 존재하면 수정모드
	const isEditMode = useMemo(() => {
		return Boolean(router.query['edit']);
	}, [router]);

	const cascaderRef = useRef(null);
	const searchListRef = useRef(null);
	const editorRef = useRef<HTMLTextAreaElement>(null);
	const [post, setPost] = useState<Post>({
		id: '',
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
	const [saveList, setSaveList] = useState<SavePost[]>([]);
	const [saveId, setSaveId] = useState<number>(1);
	const [isDragActive, toggleDragActive] = useToggle(false);

	const parsedContent = useMemo(() => {
		return DOMPurify.sanitize(marked.parse(post.content));
	}, [post.content]);

	const onKeyDown = useCallback(
		(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
			const editor = editorRef.current!;
			const { selectionStart, selectionEnd, value } = editor;

			if (e.key === 'Tab') {
				e.preventDefault();

				if (selectionStart === selectionEnd) {
					// These single character operations are undoable
					// tab키를 누르면 \t을 추가합니다.
					if (!e.shiftKey) {
						document.execCommand('insertText', false, '\t');
					}
					// shift + tab을 누르면 \t를 삭제합니다.
					if (
						e.shiftKey &&
						selectionStart > 0 &&
						value[selectionStart - 1] === '\t'
					) {
						document.execCommand('delete');
					}
				}

				// 글자 Range 선택 후 Tab
				if (selectionStart !== selectionEnd) {
					// Block indent/unindent trashes undo stack.
					// Select whole lines
					let selStart = selectionStart;
					let selEnd = selectionEnd;
					while (selStart > 0 && value[selStart - 1] !== '\n') {
						selStart--;
					}
					while (
						selEnd > 0 &&
						value[selEnd - 1] !== '\n' &&
						selEnd < value.length
					) {
						selEnd++;
					}

					let lines = value
						.substring(selStart, selEnd - selStart + 1)
						.split('\n');

					// Insert tabs
					for (let i = 0; i < lines.length; i++) {
						// Don't indent last line if cursor at start of line
						if (i === lines.length - 1 && lines[i].length === 0) continue;

						// Tab
						if (!e.shiftKey) {
							lines[i] = '\t' + lines[i];
						}

						// Shift+Tab
						if (e.shiftKey) {
							if (lines[i].startsWith('\t')) lines[i] = lines[i].substring(1);
							else if (lines[i].startsWith('    '))
								lines[i] = lines[i].substring(4);
						}
					}

					// Update textarea
					const line = lines.join('\n');
					const content =
						value.substring(0, selStart) + line + value.substring(selEnd);
					setPost((prev) => ({ ...prev, content }));
					editor.setSelectionRange(selStart, selStart + line.length);
				}
				return false;
			}
		},
		[]
	);

	const onDragOver = useCallback((e) => {
		e.preventDefault();
	}, []);

	const onDrop = useCallback(
		async (e) => {
			e.preventDefault();

			if (!editorRef.current) return;
			const editor = editorRef.current;
			const file = e.dataTransfer.files[0];

			const formData = new FormData();
			formData.append('image', file);

			try {
				const url = await getImg();

				editor.setRangeText(
					`\n![alt](${url})`,
					editor.selectionStart,
					editor.selectionEnd,
					'end'
				);

				setPost((prev) => ({ ...prev, content: editor.value }));
				editor.focus();
			} catch (err: any) {
				callNotification({
					type: 'danger',
					message: err.response.data.message,
				});
			}

			function getImg() {
				return api.post('/post/img', formData).then((res) => res.data);
			}
		},
		[callNotification]
	);

	const onChangeTitle = useCallback((e) => {
		const { value } = e.target;

		setPost((prev) => ({ ...prev, title: value }));
	}, []);

	const onChangeContent = useCallback((e) => {
		const { value } = e.target;
		setPost((prev) => ({ ...prev, content: value }));
	}, []);

	// * 카테고리 관련 로직
	const onClickToggleCategoryCascader = useCallback(() => {
		toggleCascader();
	}, [toggleCascader]);

	const onClickParentCategory = useCallback((e) => {
		const { value } = e.currentTarget.dataset;

		setPost((prev) => ({ ...prev, parentCategory: value, category: '' }));
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

	// * 태그 관련 로직
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
			const { value } = e.currentTarget.dataset;
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

	// 비밀 on or off
	const onClickPrivate = useCallback(() => {
		setPost((prev) => ({
			...prev,
			isPrivate: !prev.isPrivate,
		}));

		callNotification({
			type: 'success',
			message: post.isPrivate
				? '비밀 설정이 해제되었습니다.'
				: '비밀 설정이 되었습니다.',
		});
	}, [callNotification, post.isPrivate]);

	// * 임시 저장 관련 로직
	const onClickOpenSaveList = useCallback(() => {
		openSaveList(true);
	}, [openSaveList]);

	const onClickLoadPost = useCallback(
		(e) => {
			const { saveid: saveId } = e.target.dataset;

			// 무조건 있다고 친다.
			const savePost = saveList.find((post) => post.saveId === Number(saveId))!;
			const { saveId: postSaveId, ...withoutSaveId } = savePost;

			// saveId를 저장한다. 덮어쓸지, 추가할지, 처음 게시글인지 구분한다.
			setSaveId(Number(saveId));
			setPost((prev) => ({ ...prev, ...withoutSaveId }));
		},
		[saveList]
	);

	const onClickSavePost = useCallback(() => {
		callNotification({
			type: 'success',
			message: '임시 저장되었습니다.',
		});

		// 불러온 글을 다시 저장한다면 덮어쓰기
		if (saveList.find((post) => post.saveId === saveId)) {
			return savePosts(
				saveList.map((savePost) => {
					if (savePost.saveId === saveId) {
						return {
							...post,
							saveId,
						};
					}
					return {
						...savePost,
					};
				})
			);
		}

		// 새로운 글을 저장하면 saveId 1씩 증가.
		if (saveList.length) {
			return savePosts(
				[...saveList, { ...post, saveId: saveId + 1 }],
				saveId + 1
			);
		}

		// 없으면 처음 saveId 1
		return savePosts([{ ...post, saveId: 1 }], 1);

		function savePosts(item: SavePost[], saveId?: number) {
			localStorage.setItem('save_posts', JSON.stringify([...item]));
			saveId && localStorage.setItem('save_id', JSON.stringify(saveId));
			setSaveList([...item]);
		}
	}, [callNotification, post, saveId, saveList]);

	const onClickDeleteSavePost = useCallback(
		(e) => {
			e.stopPropagation();
			const { saveid: saveId } = e.currentTarget.dataset;

			savePosts(saveList.filter((post) => post.saveId !== Number(saveId)));

			function savePosts(item: SavePost[]) {
				localStorage.setItem('save_posts', JSON.stringify([...item]));
				setSaveList([...item]);
			}
		},
		[saveList]
	);

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

	useEffect(() => {
		if (typeof window === 'object') {
			setSaveList(JSON.parse(localStorage.getItem('save_posts') || '[]'));
			setSaveId(Number(JSON.parse(localStorage.getItem('save_id') || '1')));
		}
	}, []);

	return (
		<PostWriteStyle>
			<div className='save-loader'>
				<Button onClick={onClickOpenSaveList}>저장 목록 불러오기</Button>
			</div>

			<Modal isOpen={isSaveList}>
				<ul className='load-list'>
					{saveList.map((saved) => (
						<li
							key={saved.saveId}
							data-saveid={saved.saveId}
							onClick={onClickLoadPost}
						>
							{saved.title}
							<span
								className='load-delete'
								data-saveid={saved.saveId}
								onClick={onClickDeleteSavePost}
							>
								<MdDeleteForever />
							</span>
						</li>
					))}
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
					<button type='button' onClick={onClickToggleCategoryCascader}>
						{post.parentCategory && post.category
							? `${post.parentCategory} > ${post.category}`
							: '카테고리를 설정해 주세요.'}
					</button>

					{isCascaderOpen && (
						<ul className='category'>
							{categories.map((option) => (
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
						<div className='editor'>
							<textarea
								ref={editorRef}
								onDragOver={onDragOver}
								onDragLeave={toggleDragActive}
								onDragEnter={toggleDragActive}
								onDrop={onDrop}
								onKeyDown={onKeyDown}
								onChange={onChangeContent}
								value={post.content}
								className={`content ${isDragActive ? 'drag' : ''}`}
								spellCheck='false'
								placeholder='본문을 입력하세요.'
							/>
						</div>
						{isPreviewOpen && (
							<div
								className='preview'
								dangerouslySetInnerHTML={{
									__html: parsedContent,
								}}
							/>
						)}
					</div>
				</div>

				{/* 제출 */}
				<div className='footer'>
					<div>
						<Button
							type='button'
							color={post.isPrivate ? 'primary' : 'default'}
							onClick={onClickPrivate}
						>
							비밀 {post.isPrivate ? 'on' : 'off'}
						</Button>
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
