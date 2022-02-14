import styled from '@emotion/styled';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback } from 'react';
import { animated, useSpring } from 'react-spring';
import {
	BsArrowLeft,
	BsFillRssFill,
	BsFillTagsFill,
	BsGithub,
} from 'react-icons/bs';
import { AiOutlineFolderOpen } from 'react-icons/ai';

import { useAppDispatch, useAppSelector } from 'src/store/config';
import { toggleIsGnbOpen } from 'src/store/gnb';

/**
 * 왼쪽에 표시될 공통 네비게이션
 */
export const Gnb = () => {
	const { isGnbOpen } = useAppSelector((state) => state.gnb);
	const dispatch = useAppDispatch();

	const styles = useSpring({
		translateX: isGnbOpen ? -260 : 0,
		config: {
			duration: 200,
		},
	});

	// TODO: 실데이터 연동
	const today = 1;
	const total = 0;
	const categories = [
		{
			id: 1,
			value: '개발 노트',
			categories: [
				{
					id: 'a',
					value: 'node',
					posts: [],
				},
				{
					id: 'b',
					value: 'react',
					posts: [],
				},
			],
		},
		{
			id: 2,
			value: 'IT News',
			categories: [
				{
					id: 'c',
					value: 'default',
					posts: [],
				},
			],
		},
	];

	const onClickGnbOpen = useCallback(() => {
		dispatch(toggleIsGnbOpen());
	}, [dispatch]);

	return (
		<GnbStyle style={styles}>
			<button type='button' className='gnb-close-btn' onClick={onClickGnbOpen}>
				<BsArrowLeft />
			</button>

			<div className='user'>
				<div className='profile'>
					<Image
						src='http://placehold.it/32x32'
						alt='유저 이미지'
						width={32}
						height={32}
					/>
					<span>Kim changhoe</span>
				</div>
				<div className='text'>반갑습니다.</div>
			</div>

			<div className='categories'>
				{categories.map((category) => {
					return (
						<details
							key={category.id}
							open={false}
							onClick={(e) => console.log(e.currentTarget)}
						>
							<summary>
								{category.value}
								<span>
									{/* TODO: close */}
									<AiOutlineFolderOpen />
								</span>
							</summary>
							<ul>
								{category.categories.map((sub) => (
									<li key={sub.id}>
										{sub.value}
										<span className='count'>({sub.posts.length})</span>
									</li>
								))}
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
						RSS
					</div>
					<div>
						<BsFillTagsFill />
						<Link href='/tags'>Tags</Link>
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
		</GnbStyle>
	);
};

const GnbStyle = styled(animated.nav)`
	position: fixed;
	top: 0;
	left: 0;
	z-index: 10;
	width: 260px;
	height: 100%;
	border-right: 1px solid ${({ theme }) => theme.colors.border};
	background-color: ${({ theme }) => theme.colors.primary};
	padding: 30px 26px;

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
`;
