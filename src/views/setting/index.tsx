import { Fragment, useCallback, useEffect, useState } from 'react';
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

	// error
	// TODO: 리팩터링
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
			<h2>카테고리 추가</h2>
			<form onSubmit={onSubmitCategory}>
				{/* 새로 생성하는 카테고리 */}
				<input
					onChange={onChangeCategoryValue}
					type='text'
					placeholder='상위 카테고리'
				/>
				<button type='submit'>저장</button>
			</form>

			<h2>현재 카테고리</h2>
			<ul>
				{categories.map((category) => (
					<Fragment key={category.id}>
						<span>
							{category.value}
							<button
								id={category.id}
								type='button'
								onClick={onClickCreateSubCategory}
							>
								+
							</button>
							<button
								type='button'
								id={category.id}
								onClick={onClickDeleteCategory}
							>
								X
							</button>
						</span>
						<ul>
							{category.categories.map((sub) => (
								<li key={sub.id}>
									{sub.value} <span>({sub?.posts?.length || 0})</span>
									<button
										type='button'
										id={sub.id}
										onClick={onClickDeleteSubCategory}
									>
										X
									</button>
								</li>
							))}
							{category.id === newSubCategory.parentId && (
								<form onSubmit={onSubmitSubCategory}>
									<input
										type='text'
										placeholder='new sub'
										onChange={onChangeSubCategoryValue}
									/>
									<button type='submit'>저장</button>
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
