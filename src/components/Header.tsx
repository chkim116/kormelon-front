import styled from '@emotion/styled';
import { useState } from 'react';

import { AiOutlineSearch } from 'react-icons/ai';
import { MdLightMode, MdModeNight } from 'react-icons/md';

/**
 * 홈페이지 헤더
 */
export const Header = () => {
	const [themeMode, setThemeMode] = useState('light');

	return (
		<HeaderStyle>
			<div className='header'>
				<p>My Blog Name</p>

				<span className='status'>
					<form className='search-form'>
						<input type='text' placeholder='검색..' />
						<button type='submit'>
							<AiOutlineSearch />
						</button>
					</form>
					{/* TODO: dark mode on off */}

					<button
						type='button'
						className='mode-btn'
						onClick={() =>
							setThemeMode((prev) => (prev === 'dark' ? 'light' : 'dark'))
						}
					>
						{themeMode === 'dark' && <MdLightMode className='light' />}
						{themeMode === 'light' && <MdModeNight className='dark' />}
					</button>
				</span>
			</div>
		</HeaderStyle>
	);
};

const HeaderStyle = styled.header`
	position: fixed;
	width: 100%;
	height: 50px;
	top: 0;
	left: 0;
	background-color: ${({ theme }) => theme.colors.primary};

	.header {
		max-width: 700px;
		width: 100%;
		height: 100%;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 10px;

		p {
			font-weight: 500;
		}

		.status {
			display: flex;
			gap: 4px;

			.search-form {
				position: relative;
				max-width: 250px;
				width: 100%;
				input {
					width: 100%;
					font-size: ${({ theme }) => theme.fontSizes.sm};
					background-color: ${({ theme }) => theme.colors.primary};
					color: ${({ theme }) => theme.colors.onPrimary};
					padding: 4px 10px;
					border-radius: 8px;
					outline: none;
					border: none;
					border: 1px solid ${({ theme }) => theme.colors.border};
				}

				button {
					position: absolute;
					display: flex;
					align-items: center;
					top: 50%;
					right: 5px;
					transform: translateY(-50%);
					color: ${({ theme }) => theme.colors.onPrimary};

					svg {
						width: 18px;
						height: 18px;
					}
				}
			}

			.mode-btn {
				display: flex;
				align-items: center;

				svg {
					width: 22px;
					height: 22px;

					&.light {
						color: yellow;
					}

					&.dark {
						color: gray;
						transform: rotate(160deg);
					}
				}
				&:hover {
					transform: scale(1.1);
					transition: 100ms;
				}
			}
		}
	}
`;
