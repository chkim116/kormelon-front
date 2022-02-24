import { Fragment, useCallback, useEffect, useState } from 'react';
import Button from 'src/components/Button';
import { useNotification } from 'src/hooks/useNotification';

import {
	deleteCategory,
	deleteSubCategory,
	postCategory,
	postSubCategory,
} from 'src/store/category';
import { useAppDispatch, useAppSelector } from 'src/store/config';

import SettingStyle from './SettingStyle';

const Setting = () => {
	const dispatch = useAppDispatch();
	const {
		categories,
		isCreateDone,
		isSubCreateDone,
		isCreateErr,
		isSubCreateErr,
		isDeleteErr,
		isSubDeleteErr,
	} = useAppSelector((state) => state.category);
	const { callNotification } = useNotification();

	const [newCategoryValue, setNewCategoryValue] = useState<string>('');
	const [newSubCategory, setNewSubCategory] = useState({
		parentId: '',
		value: '',
	});

	const onClickSubInputHide = useCallback(() => {
		setNewSubCategory({ parentId: '', value: '' });
	}, []);

	const onClickCreateSubCategory = useCallback((e) => {
		const { id } = e.target;
		setNewSubCategory({ parentId: id, value: '' });
	}, []);

	const onChangeCategoryValue = useCallback((e) => {
		setNewCategoryValue(e.target.value);
	}, []);

	const onChangeSubCategoryValue = useCallback((e) => {
		setNewSubCategory((prev) => ({ ...prev, value: e.target.value }));
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

	// TODO: 리팩터링
	// success
	useEffect(() => {
		if (isSubCreateDone) {
			callNotification({
				type: 'success',
				message: '하위 카테고리가 생성되었습니다.',
			});
		}
	}, [callNotification, isSubCreateDone]);

	useEffect(() => {
		if (isCreateDone) {
			callNotification({
				type: 'success',
				message: '카테고리가 생성되었습니다.',
			});
		}
	}, [callNotification, isCreateDone]);

	// error
	useEffect(() => {
		if (isSubDeleteErr) {
			callNotification({
				type: 'danger',
				message: isSubDeleteErr,
			});
		}
	}, [callNotification, isSubDeleteErr]);

	useEffect(() => {
		if (isDeleteErr) {
			callNotification({
				type: 'danger',
				message: isDeleteErr,
			});
		}
	}, [callNotification, isDeleteErr]);

	useEffect(() => {
		if (isSubCreateErr) {
			callNotification({
				type: 'danger',
				message: isSubCreateErr,
			});
		}
	}, [callNotification, isSubCreateErr]);

	useEffect(() => {
		if (isCreateErr) {
			callNotification({
				type: 'danger',
				message: isCreateErr,
			});
		}
	}, [callNotification, isCreateErr]);

	return (
		<SettingStyle>
			<form onSubmit={onSubmitCategory} className='parent-form'>
				{/* 새로 생성하는 카테고리 */}
				<input
					onChange={onChangeCategoryValue}
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
									type='button'
									id={category.id}
									onClick={onClickDeleteCategory}
								>
									X
								</Button>
							</span>
						</span>
						<ul className='category-sub-list'>
							{category.categories.map((sub) => (
								<li key={sub.id}>
									<span>
										{sub.value} <span>({sub?.posts?.length || 0})</span>
									</span>
									<Button
										type='button'
										id={sub.id}
										onClick={onClickDeleteSubCategory}
									>
										X
									</Button>
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
											X
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
