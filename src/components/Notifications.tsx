import styled from '@emotion/styled';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useCallback, useMemo, useRef } from 'react';
import { IoNotificationsOutline } from 'react-icons/io5';
import { useClickAway, useToggle } from 'react-use';

import { api } from 'src/lib/api';
import { useAppSelector } from 'src/store/config';

const Notifications = () => {
	const { userData } = useAppSelector((state) => state.user);

	const [toggle, toggleList] = useToggle(false);
	const notiList = useRef(null);

	const notificationList = useMemo(() => {
		return userData?.notifications.filter((noti) => !noti.isRead) || [];
	}, [userData?.notifications]);

	useClickAway(notiList, () => toggleList(false));

	const onClickDeleteList = useCallback(async (e) => {
		const { id: targetId } = e.currentTarget;

		await api.get(`/user/noti/${targetId}`);
	}, []);

	if (!notificationList.length) {
		return null;
	}

	return (
		<NotificationsStyle onClick={toggleList}>
			<span className='cnt'>{notificationList.length}</span>
			<IoNotificationsOutline />

			{toggle && (
				<div className='notification-box' ref={notiList}>
					{notificationList.map((notification, i) => (
						<div
							key={notification.postId + i}
							onClick={onClickDeleteList}
							id={notification.targetId}
						>
							<ul>
								<li>
									<Link
										href={`/post/${notification.postId}/${notification.postTitle}?target=${notification.targetId}&type=${notification.type}`}
										passHref
									>
										<a>
											<div>
												<div className='notification-title'>
													{notification.postTitle}에{' '}
													{notification.type === 'comment'
														? '댓글이 달렸습니다.'
														: '대댓글이 달렸습니다.'}
												</div>

												<div className='notification-value'>
													{notification.value}
												</div>

												<div className='notification-date'>
													<div>{notification.author}</div>
													<div>
														{dayjs(notification.createdAt).format('YYYY-MM-DD')}
													</div>
												</div>
											</div>
										</a>
									</Link>
								</li>
							</ul>
						</div>
					))}
				</div>
			)}
		</NotificationsStyle>
	);
};

export default Notifications;

const NotificationsStyle = styled.div`
	position: fixed;
	right: 2%;
	bottom: 5%;
	background-color: ${({ theme }) => theme.colors.primary};
	border-radius: 50%;
	line-height: 1;
	padding: 6px;
	z-index: 50;

	.cnt {
		position: absolute;
		top: -5px;
		right: 0px;
		width: 18px;
		line-height: 9px;
		text-align: center;
		height: 18px;
		font-size: 13px;
		padding: 4px;
		background-color: ${({ theme }) => theme.colors.onRed};
		color: #fff;
		border-radius: 50%;
	}

	svg {
		font-size: 28px;
		cursor: pointer;
		color: ${({ theme }) => theme.colors.onPrimary};
	}

	.notification-box {
		max-height: 300px;
		overflow-y: auto;
		border: 1px solid ${({ theme }) => theme.colors.border};
		z-index: 100;
		position: absolute;
		background-color: ${({ theme }) => theme.colors.primary};
		bottom: calc(5% + 60px);
		right: 0;
		width: 280px;
		word-wrap: break-word;

		li {
			padding: 1em;
			list-style: none;
			font-size: ${({ theme }) => theme.fontSizes.sm};

			&:hover {
				background-color: ${({ theme }) => theme.colors.secondary};
			}
		}

		.notification-title {
			margin-bottom: 10px;
		}

		.notification-value {
			margin-bottom: 10px;
			font-weight: bold;
		}

		.notification-date {
			display: flex;
			justify-content: space-between;
		}
	}

	@media all and (max-width: 500px) {
		padding: 3px;

		.cnt {
			top: -8px;
			right: -3px;
		}

		svg {
			font-size: 24px;
		}
	}
`;
