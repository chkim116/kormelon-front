import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { useToggle } from 'react-use';

import Button from 'src/components/Button';
import { useAppDispatch, useAppSelector } from 'src/store/config';
import { postLogin, postRegister } from 'src/store/user';

const LoginInput = () => {
	return (
		<>
			<input autoComplete='off' type='text' name='email' placeholder='email' />
			<input
				autoComplete='off'
				type='password'
				name='password'
				placeholder='password'
			/>
		</>
	);
};

const RegisterInput = () => {
	return (
		<>
			<input autoComplete='off' type='text' name='email' placeholder='email' />
			<input
				autoComplete='off'
				type='text'
				name='username'
				placeholder='username'
			/>
			<input
				autoComplete='off'
				type='password'
				name='password'
				placeholder='password'
			/>
		</>
	);
};

const Login = () => {
	const router = useRouter();

	const dispatch = useAppDispatch();
	const { isLoginDone, isRegisterDone } = useAppSelector((state) => state.user);

	const [isLogin, onClickToggle] = useToggle(true);
	const [form, setForm] = useState({
		email: '',
		username: '',
		password: '',
	});

	const onChangeForm = useCallback((e) => {
		const { name, value } = e.target;

		setForm((prev) => ({ ...prev, [name]: value }));
	}, []);

	const onSubmitForm = useCallback(
		(e) => {
			e.preventDefault();
			const { username, ...withoutUsername } = form;

			// isLogin 상태면 로그인
			if (isLogin) {
				dispatch(postLogin(withoutUsername));
			}

			if (!isLogin) {
				dispatch(postRegister({ ...withoutUsername, username }));
			}
		},
		[dispatch, form, isLogin]
	);

	useEffect(() => {
		if (isLoginDone) {
			router.push('/');
		}
	}, [isLoginDone, router]);

	useEffect(() => {
		if (isRegisterDone) {
			onClickToggle(true);
		}
	}, [isRegisterDone, onClickToggle]);

	return (
		<SignForm>
			<form onChange={onChangeForm} onSubmit={onSubmitForm}>
				{isLogin ? <LoginInput /> : <RegisterInput />}
				<div className='footer'>
					<Button type='submit' color='primary'>
						{isLogin ? '로그인' : '가입완료'}
					</Button>
					<Button type='button' onClick={onClickToggle}>
						{isLogin ? '가입하기' : '로그인하기'}
					</Button>
				</div>
			</form>
		</SignForm>
	);
};

export default Login;

const SignForm = styled.div`
	width: 100%;
	padding: 25% 10px 0 10px;
	display: flex;
	justify-content: center;

	form {
		max-width: 500px;
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 18px;
		color: ${({ theme }) => theme.colors.onPrimary};
		background-color: ${({ theme }) => theme.colors.primary};

		input {
			border-top: none;
			border-left: none;
			border-right: none;
			border-radius: 4px;
			padding: 6px 12px;
			width: 100%;
			font-size: ${({ theme }) => theme.fontSizes.lg};
			color: ${({ theme }) => theme.colors.onPrimary};
			background-color: ${({ theme }) => theme.colors.primary};
		}

		.footer {
			display: flex;
			justify-content: flex-end;
			margin-top: 24px;
			gap: 6px;
			button {
				width: 100px;
			}
		}
	}
`;
