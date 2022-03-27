import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { animated, useSpring } from 'react-spring';
import {
	BsArrowLeft,
	BsFillRssFill,
	BsFillTagsFill,
	BsGithub,
	BsPencil,
} from 'react-icons/bs';
import { AiOutlineFolderOpen, AiOutlineFolder } from 'react-icons/ai';
import { MdSettings } from 'react-icons/md';
import { useClickAway } from 'react-use';

import { useAppDispatch, useAppSelector } from 'src/store/config';
import { toggleIsGnbOpen } from 'src/store/gnb';
import { getCategory } from 'src/store/category';
import { postLogout } from 'src/store/user';

import profileImg from '../../public/static/profile.jpeg';

/**
 * 왼쪽에 표시될 공통 네비게이션
 */
export const Gnb = () => {
	const router = useRouter();

	const dispatch = useAppDispatch();
	const { isGnbOpen } = useAppSelector((state) => state.gnb);
	const { categories } = useAppSelector((state) => state.category);
	const { userData } = useAppSelector((state) => state.user);
	const { today, total } = useAppSelector((state) => state.view);

	const styles = useSpring({
		translateX: isGnbOpen ? 0 : -260,
		config: {
			duration: 200,
		},
	});
	const gnbRef = useRef(null);

	const temp = useMemo(() => {
		const res: { [x: string]: boolean } = {};
		for (const category of categories) {
			res[category.value] = false;
		}
		return res;
	}, [categories]);

	const [openCategories, setOpenCategories] = useState(temp);

	const onClickGnbOpen = useCallback(() => {
		dispatch(toggleIsGnbOpen());
	}, [dispatch]);

	const onClickCategoryOpen = useCallback((e) => {
		const {
			open,
			dataset: { value },
		} = e.currentTarget;

		// open이 아니라 !open인 이유는 한박자 늦게 반영되기 때문.
		setOpenCategories((prev) => ({ ...prev, [value]: !open }));
	}, []);

	const onClickLogout = useCallback(() => {
		dispatch(postLogout());
		dispatch(toggleIsGnbOpen());
	}, [dispatch]);

	useEffect(() => {
		if (isGnbOpen) {
			dispatch(toggleIsGnbOpen());
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [router]);

	useEffect(() => {
		dispatch(getCategory());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [router.asPath]);

	useClickAway(gnbRef, () => isGnbOpen && dispatch(toggleIsGnbOpen(false)));

	return (
		<GnbStyle style={styles} ref={gnbRef}>
			<button type='button' className='gnb-close-btn' onClick={onClickGnbOpen}>
				<BsArrowLeft />
			</button>

			<div className='user'>
				<div className='profile'>
					<Image src={profileImg} alt='유저 이미지' width={32} height={32} />
					<span>Kim Changhoe</span>
				</div>
				<div className='text'>
					I&apos;m Frontend Developer 😀 <br />I love JavaScript and More.
				</div>
			</div>

			<div className='categories'>
				{categories.map((category) => {
					return (
						<details
							key={category.id}
							data-value={category.value}
							onClick={onClickCategoryOpen}
						>
							<summary>
								{category.value}
								<span>
									{openCategories[category.value] ? (
										<AiOutlineFolderOpen />
									) : (
										<AiOutlineFolder />
									)}
								</span>
							</summary>
							<ul>
								{category.categories.length ? (
									category.categories.map((sub) => (
										<li key={sub.id}>
											<Link
												href={`/search/category/sub?q=${sub.value}`}
												passHref
											>
												<span>
													{sub.value}
													<span className='count'>
														({sub?.posts?.length || 0})
													</span>
												</span>
											</Link>
										</li>
									))
								) : (
									<li className='empty'>❗️ Empty :( </li>
								)}
							</ul>
						</details>
					);
				})}
			</div>

			<div className='divided'></div>

			<div className='footer'>
				<div className='feed'>
					<div>
						<BsFillRssFill />
						<Link href='/rss'>RSS</Link>
					</div>
					<div>
						<BsFillTagsFill />
						<Link href='/search/tag/all'>Tags</Link>
					</div>
					<div>
						<BsGithub />
						<a
							href='https://github.com/chkim116'
							target='_blank'
							rel='noreferrer'
						>
							Github
						</a>
					</div>
				</div>
				<div className='view'>
					<div>
						<span>Total</span>
						<span>{total}</span>
					</div>
					<div>
						<span>Today</span>
						<span>{today}</span>
					</div>
				</div>
			</div>

			<br />

			{userData ? (
				<>
					<p className='user-on'>🚀 Your Name : {userData.username}</p>
					<p className='user-logout' onClick={onClickLogout}>
						Logout?
					</p>
				</>
			) : (
				<span className='user-off'>
					<span>👉</span>
					<Link href='/login'>Login</Link>
				</span>
			)}

			<br />

			{userData?.isAdmin && (
				<div className='link-icons'>
					<Link href='/post/write' passHref>
						<a className='write'>
							<BsPencil />
						</a>
					</Link>

					{/* category 생성 */}
					<Link href='/setting' passHref>
						<a className='setting'>
							<MdSettings />
						</a>
					</Link>
				</div>
			)}
		</GnbStyle>
	);
};

const GnbStyle = styled(animated.nav)`
	position: fixed;
	top: 0;
	left: 0;
	z-index: 100;
	width: 260px;
	height: 100%;
	border-right: 1px solid ${({ theme }) => theme.colors.border};
	background-color: ${({ theme }) => theme.colors.primary};
	padding: 30px 26px;
	overflow-y: auto;

	.gnb-close-btn {
		position: absolute;
		top: 10px;
		right: 25px;
		font-size: 20px;
		color: ${({ theme }) => theme.colors.onPrimary};
	}

	.user {
		padding-top: 20px;
		width: 100%;
		display: flex;
		flex-direction: column;

		.profile {
			display: flex;
			align-items: center;
			width: 100%;
			gap: 10px;
		}

		.text {
			margin-top: 12px;
			margin-left: 4px;
		}

		img {
			border-radius: 50%;
		}
	}

	.categories {
		padding-top: 40px;

		details {
			summary {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 10px 5px;
				cursor: pointer;
				height: 100%;
			}

			svg {
				width: 12px;
				height: 12px;
				color: ${({ theme }) => theme.colors.onPrimary};
			}

			ul {
				cursor: pointer;

				li {
					padding: 10px 5px 10px 15px;
				}

				.empty {
					list-style: none;
					cursor: default;
				}

				.count {
					margin-left: 4px;
				}
			}
		}
	}

	.divided {
		width: 100%;
		height: 1px;
		margin: 20px 0;
		background-color: ${({ theme }) => theme.colors.border};
	}

	.footer {
		display: flex;
		flex-direction: column;
		padding: 10px 0;
		gap: 10px;

		.feed {
			display: flex;
			flex-direction: column;
			justify-content: center;
			gap: 15px;
			font-size: ${({ theme }) => theme.fontSizes.xs};

			svg {
				width: 10px;
				height: 10px;
				margin-right: 8px;
			}
		}

		.view {
			margin-top: 10px;
			width: 100%;
			display: flex;
			flex-direction: column;
			gap: 10px;
			font-size: ${({ theme }) => theme.fontSizes.xs};
			font-weight: 300;

			div {
				&:nth-of-type(1),
				&:nth-of-type(2) {
					display: flex;

					span {
						&:nth-of-type(1) {
							width: 42px;
						}
					}
				}
			}
		}
	}

	.link-icons {
		display: flex;
		align-items: center;
		gap: 4px;

		.setting,
		.write {
			color: ${({ theme }) => theme.colors.blue};
			font-size: 20px;
			padding: 0;
			margin-top: 4px;
		}

		.write {
			font-size: 16px;
		}
	}

	.user-on {
		margin-top: -3px;
		font-weight: bold;
		font-size: ${({ theme }) => theme.fontSizes.md};
	}

	.user-logout {
		margin-top: 6px;
		font-size: ${({ theme }) => theme.fontSizes.sm};
		cursor: pointer;
		font-weight: bold;

		&:hover {
			text-decoration: underline;
		}
	}

	.user-off {
		margin-top: -3px;
		font-weight: bold;
		font-size: ${({ theme }) => theme.fontSizes.md};

		a:hover {
			text-decoration: underline;
		}

		span {
			margin-right: 8px;
		}
	}
`;
