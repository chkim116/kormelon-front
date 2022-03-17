import { Fragment, useCallback, useState } from 'react';
import { BsCheck } from 'react-icons/bs';
import { MdClose, MdModeEdit } from 'react-icons/md';
import Button from 'src/components/Button';
import { useNotification } from 'src/hooks/useNotification';

import {
	Category,
	deleteCategory,
	deleteSubCategory,
	patchCategory,
	patchSubCategory,
	postCategory,
	postSubCategory,
} from 'src/store/category';
import { useAppDispatch, useAppSelector } from 'src/store/config';

import SettingStyle from './SettingStyle';

const Setting = () => {
	const dispatch = useAppDispatch();
	const { categories } = useAppSelector((state) => state.category);
	const { callNotification } = useNotification();

	const [newCategoryValue, setNewCategoryValue] = useState<string>('');
	const [editCategoryValue, setEditCategoryValue] = useState({
		id: '',
		value: '',
	});
	const [newSubCategory, setNewSubCategory] = useState({
		parentId: '',
		value: '',
	});
	const [editSubCategory, setEditSubCategory] = useState({
		id: '',
		value: '',
	});

	const onClickSubInputHide = useCallback(() => {
		setNewSubCategory({ parentId: '', value: '' });
	}, []);

	const onClickCreateSubCategory = useCallback((e) => {
		const { id } = e.target;
		setNewSubCategory({ parentId: id, value: '' });
	}, []);

	const onClickEditCategory = useCallback(
		(e) => {
			const { id } = e.target;
			setEditCategoryValue((prev) => ({
				id,
				value: categories.find((category) => category.id === id)?.value || '',
			}));
		},
		[categories]
	);

	const onChangeEditCategoryValue = useCallback((e) => {
		setEditCategoryValue((prev) => ({ ...prev, value: e.target.value }));
	}, []);

	const onChangeCategoryValue = useCallback((e) => {
		setNewCategoryValue(e.target.value);
	}, []);

	const onChangeSubCategoryValue = useCallback((e) => {
		setNewSubCategory((prev) => ({ ...prev, value: e.target.value }));
	}, []);

	const onSubmitEditCategory = useCallback(
		(e) => {
			e.preventDefault();
			if (window.confirm('수정하시겠습니까?')) {
				dispatch(patchCategory(editCategoryValue));
				setEditCategoryValue({ id: '', value: '' });
			}
		},
		[dispatch, editCategoryValue]
	);

	const onClickCancelEdit = useCallback((e) => {
		setEditCategoryValue({ id: '', value: '' });
	}, []);

	const onSubmitCategory = useCallback(
		(e) => {
			e.preventDefault();

			if (!newCategoryValue) {
				return callNotification({
					type: 'danger',
					message: '값을 올바르게 입력하세요.',
				});
			}

			dispatch(postCategory(newCategoryValue));
			setNewCategoryValue('');
			setNewSubCategory({ parentId: '', value: '' });
		},
		[callNotification, dispatch, newCategoryValue]
	);

	const onSubmitSubCategory = useCallback(
		(e) => {
			e.preventDefault();

			if (!newSubCategory.value || !newSubCategory.parentId) {
				return callNotification({
					type: 'danger',
					message: '값을 올바르게 입력하세요.',
				});
			}

			dispatch(postSubCategory(newSubCategory));
			setNewSubCategory({ parentId: '', value: '' });
		},
		[callNotification, dispatch, newSubCategory]
	);

	const onClickDeleteCategory = useCallback(
		(e) => {
			const { id } = e.target;
			if (
				window.confirm(
					'정말 삭제합니까? 모든 하위 카테고리, 게시글이 삭제됩니다.'
				)
			) {
				dispatch(deleteCategory(id));
			}
		},
		[dispatch]
	);

	const onClickEditSubCategory = useCallback(
		(e) => {
			const { id } = e.currentTarget;
			const { parentid: parentId } = e.currentTarget.dataset;
			console.log(id, parentId);
			const value =
				categories
					?.find((cate: Category) => cate.id === parentId)
					?.categories.find((sub: Category) => sub.id === id)?.value || '';

			setEditSubCategory((prev) => ({ ...prev, id, value }));
		},
		[categories]
	);

	const onChangeEditSubCategory = useCallback((e) => {
		setEditSubCategory((prev) => ({ ...prev, value: e.target.value }));
	}, []);

	const onSubmitEditSubCategory = useCallback(
		(e) => {
			e.preventDefault();
			if (window.confirm('수정하시겠습니까?')) {
				dispatch(patchSubCategory(editSubCategory));
				setEditSubCategory({ id: '', value: '' });
			}
		},
		[dispatch, editSubCategory]
	);

	const onClickCancelSubEdit = useCallback((e) => {
		setEditSubCategory({ id: '', value: '' });
	}, []);

	const onClickDeleteSubCategory = useCallback(
		(e) => {
			const { id } = e.target;
			if (
				window.confirm('정말 삭제합니까? 해당 카테고리의 게시글도 삭제됩니다.')
			) {
				dispatch(deleteSubCategory(id));
			}
		},
		[dispatch]
	);

	return (
		<SettingStyle>
			<form onSubmit={onSubmitCategory} className='parent-form'>
				{/* 새로 생성하는 카테고리 */}
				<input
					onChange={onChangeCategoryValue}
					value={newCategoryValue}
					type='text'
					placeholder='원하는 카테고리를..'
				/>
				<Button color='primary' type='submit'>
					저장
				</Button>
			</form>

			<ul className='category-list'>
				{categories.map((category) => (
					<Fragment key={category.id}>
						<span className='parent-category'>
							{editCategoryValue.id !== category.id ? (
								<>
									<h4>- {category.value}</h4>
									<span>
										<Button
											color='primary'
											id={category.id}
											type='button'
											onClick={onClickCreateSubCategory}
										>
											+
										</Button>
										<Button
											id={category.id}
											type='button'
											onClick={onClickEditCategory}
										>
											<MdModeEdit />
										</Button>
										<Button
											type='button'
											id={category.id}
											onClick={onClickDeleteCategory}
										>
											<MdClose />
										</Button>
									</span>
								</>
							) : (
								<form className='edit-category' onSubmit={onSubmitEditCategory}>
									<span>
										<input
											type='text'
											value={editCategoryValue.value}
											onChange={onChangeEditCategoryValue}
										/>
									</span>
									<span>
										<Button color='primary' type='submit'>
											<BsCheck />
										</Button>
										<Button type='button' onClick={onClickCancelEdit}>
											<MdClose />
										</Button>
									</span>
								</form>
							)}
						</span>
						<ul className='category-sub-list'>
							{category.categories.map((sub) => (
								<li key={sub.id}>
									{editSubCategory.id !== sub.id ? (
										<>
											<span>
												{sub.value} <span>({sub?.posts?.length || 0})</span>
											</span>
											<span>
												<Button
													type='button'
													id={sub.id}
													data-parentid={category.id}
													onClick={onClickEditSubCategory}
												>
													<MdModeEdit />
												</Button>

												<Button
													type='button'
													id={sub.id}
													onClick={onClickDeleteSubCategory}
												>
													<MdClose />
												</Button>
											</span>
										</>
									) : (
										<form
											className='edit-sub-category'
											onSubmit={onSubmitEditSubCategory}
										>
											<input
												type='text'
												value={editSubCategory.value}
												onChange={onChangeEditSubCategory}
											/>
											<span>
												<Button color='primary' type='submit'>
													<BsCheck />
												</Button>
												<Button type='button' onClick={onClickCancelSubEdit}>
													<MdClose />
												</Button>
											</span>
										</form>
									)}
								</li>
							))}
							{category.id === newSubCategory.parentId && (
								<form onSubmit={onSubmitSubCategory} className='sub-form'>
									<input
										type='text'
										placeholder={`${category.value}의 하위 카테고리..`}
										onChange={onChangeSubCategoryValue}
									/>
									<span>
										<Button color='primary' type='submit'>
											저장
										</Button>
										<Button type='button' onClick={onClickSubInputHide}>
											<MdClose />
										</Button>
									</span>
								</form>
							)}
						</ul>
					</Fragment>
				))}
			</ul>
		</SettingStyle>
	);
};

export default Setting;
