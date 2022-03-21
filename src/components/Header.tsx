import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';

import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdLightMode, MdModeNight } from 'react-icons/md';

import { useAppDispatch, useAppSelector } from 'src/store/config';
import { toggleIsGnbOpen } from 'src/store/gnb';
import { toggleThemeMode } from 'src/store/themeMode';

/**
 * 홈페이지 헤더
 */
export const Header = () => {
	const router = useRouter();

	const { themeMode } = useAppSelector((state) => state.themeMode);
	const { userData } = useAppSelector((state) => state.user);
	const dispatch = useAppDispatch();

	const mobileSearchRef = useRef<HTMLInputElement>(null);

	const [searchText, setSearchText] = useState('');
	const [isShowMobileSearchBar, setIsShowMobileSearchBar] = useState(false);

	const onClickChangeTheme = useCallback(() => {
		dispatch(toggleThemeMode());
	}, [dispatch]);

	const onClickOpenGnb = useCallback(() => {
		dispatch(toggleIsGnbOpen());
	}, [dispatch]);

	const onClickShowSearch = useCallback(() => {
		setIsShowMobileSearchBar((prev) => !prev);
	}, []);

	const onChangeSearch = useCallback((e) => {
		setSearchText(e.target.value);
	}, []);

	const onSubmitSearch = useCallback(
		(e) => {
			e.preventDefault();

			router.push(`/search?q=${searchText}`);
			setSearchText('');
		},
		[searchText, router]
	);

	useEffect(() => {
		if (isShowMobileSearchBar) {
			mobileSearchRef.current!.focus();
		}
	}, [isShowMobileSearchBar]);

	return (
		<HeaderStyle>
			<div className='header'>
				<span>
					<button type='button' className='gnb-open' onClick={onClickOpenGnb}>
						<GiHamburgerMenu />
					</button>

					<p>
						<Link href='/'>My Blog Name</Link>
					</p>
				</span>
				<span className='status'>
					<form className='search-form' onSubmit={onSubmitSearch}>
						<input
							type='text'
							placeholder='제목 검색..'
							value={searchText}
							onChange={onChangeSearch}
						/>
						<button type='submit'>
							<AiOutlineSearch />
						</button>

						{/* only min 500px */}
						{isShowMobileSearchBar && (
							<input
								ref={mobileSearchRef}
								type='text'
								placeholder='검색..'
								className='search-mobile-input'
							/>
						)}
						<button
							type='button'
							className='search-mobile'
							onClick={onClickShowSearch}
						>
							{isShowMobileSearchBar ? <AiOutlineClose /> : <AiOutlineSearch />}
						</button>

						{/* only min 500px 끝 */}
					</form>
					<button
						type='button'
						className='mode-btn'
						onClick={onClickChangeTheme}
					>
						{themeMode === 'dark' && <MdLightMode className='light' />}
						{themeMode === 'light' && <MdModeNight className='dark' />}
					</button>
					{userData ? <p>{userData.username}</p> : null}
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
		max-width: 1000px;
		width: 100%;
		height: 100%;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 10px;

		span {
			display: flex;
			align-items: center;
		}

		.gnb-open {
			font-size: 26px;
			position: absolute;
			left: 15px;
			display: flex;
			align-items: center;
			padding: 0 3px;
			color: ${({ theme }) => theme.colors.onPrimary};

			@media all and (max-width: 1000px) {
				position: relative;
				font-size: 20px;
				left: 0;
				display: flex;
				align-items: center;
				margin-right: 8px;
			}
		}

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

				.search-mobile {
					display: none;
				}

				@media all and (max-width: 500px) {
					.search-mobile {
						display: flex;
						align-items: center;
						margin-top: 1px;
						justify-content: flex-end;
					}

					.search-mobile-input {
						position: fixed;
						display: flex;
						border: none;
						width: calc(100% - 60px);
						border-radius: 0;
						border-bottom: 1px solid ${({ theme }) => theme.colors.border};
						height: 50px;
						top: 0;
						left: 0;
						padding: 4px 10px;
						padding-right: 35px;
					}
				}

				input {
					width: 100%;
					font-size: ${({ theme }) => theme.fontSizes.sm};
					background-color: ${({ theme }) => theme.colors.primary};
					color: ${({ theme }) => theme.colors.onPrimary};
					padding: 4px 10px;
					padding-right: 35px;
					border-radius: 8px;
					outline: none;
					border: none;
					border: 1px solid ${({ theme }) => theme.colors.border};

					@media all and (max-width: 500px) {
						display: none;
					}
				}

				button {
					width: 30px;
					position: absolute;
					background-color: ${({ theme }) => theme.colors.primary};
					display: flex;
					align-items: center;
					top: 50%;
					right: 5px;
					transform: translateY(-50%);
					color: ${({ theme }) => theme.colors.onPrimary};

					@media all and (max-width: 500px) {
						display: none;
					}

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
