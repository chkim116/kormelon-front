import styled from '@emotion/styled';
import React from 'react';
import { BsFillChatSquareTextFill, BsGithub } from 'react-icons/bs';
import { MdMail } from 'react-icons/md';

export const Footer = () => {
	return (
		<FooterStyle>
			<div className='inner'>
				<h4>Copy &copy; Kimchanghoe</h4>
				<div className='etc'>
					<div>
						<MdMail />
						<a href='mailto:cskim132@gmail.com'>
							<span>Gmail</span>
						</a>
					</div>

					<div>
						<BsGithub />
						<a href='https://github.com/chkim116'>
							<span>Github</span>
						</a>
					</div>

					<div>
						<BsFillChatSquareTextFill />
						<a href='https://portfolio.kormelon.com'>
							<span>Portfolio</span>
						</a>
					</div>
				</div>
			</div>
		</FooterStyle>
	);
};

const FooterStyle = styled.footer`
	margin-top: 4em;
	width: 100%;
	background-color: ${({ theme }) => theme.colors.secondary};
	color: ${({ theme }) => theme.colors.onSecondary};
	min-height: 20vh;
	display: flex;
	justify-content: center;
	align-items: center;

	.inner {
		max-width: 1024px;
		width: 100%;
		margin: 0 auto;
		padding: 1em;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		h4 {
			margin-bottom: 8px;
			font-size: 18px;
		}

		@media all and (max-width: 500px) {
			align-items: flex-start;
			.etc {
				flex-direction: column;
				& > div {
					margin-bottom: 10px;
				}
			}
		}

		.etc {
			margin-top: 12px;
			display: flex;
			align-items: center;

			& > div {
				display: flex;
				align-items: center;
				width: 100px;
				a:hover {
					text-decoration: underline;
				}

				&:nth-of-type(1) {
					color: ${({ theme }) => theme.colors.onSecondary};
				}

				&:nth-of-type(2) {
					color: ${({ theme }) => theme.colors.onSecondary};
				}

				&:nth-of-type(3) {
					color: ${({ theme }) => theme.colors.onSecondary};
				}

				svg {
					margin-right: 8px;
					font-size: 18px;
				}
			}
		}
	}
`;
