import styled from '@emotion/styled';
import React from 'react';
import { useToggle } from 'react-use';

import Button from 'src/components/Button';

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
	const [isLogin, onClickToggle] = useToggle(true);

	return (
		<SignForm>
			<form>
				{isLogin ? <LoginInput /> : <RegisterInput />}
				<div className='footer'>
					<Button type='submit' color='primary'>
						로그인
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
