import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const focus = keyframes`
	0% {
		opacity: 0.3;
		background-color: #ffff00;
	}
	100% {
		opacity: 1;
	}
`;

const PostStyle = styled.div`
	display: flex;
	width: 100%;

	/* 포커싱 애니메이션 */
	.focus {
		animation: ${focus} 1500ms forwards;
	}

	.anchors {
		position: sticky;
		top: 50px;
		height: 100%;
		display: flex;
		width: 200px;
		flex-direction: column;
		gap: 12px;
		padding-left: 40px;
		padding-top: 24px;

		.anchor {
			cursor: pointer;
			color: ${({ theme }) => theme.colors.onSecondary};

			&.active {
				color: ${({ theme }) => theme.colors.onBlue};
				font-weight: 600;
			}
			&:hover {
				text-decoration: underline;
			}
		}

		@media all and (max-width: 900px) {
			display: none;
		}
	}

	.post {
		width: 800px;

		h1,
		h2,
		h3,
		h4 {
			margin-bottom: 12px;
		}

		.category {
			margin-bottom: 20px;
			font-size: 13px;

			span {
				margin: 0 6px;
			}
		}

		.title {
			margin-bottom: 12px;
		}

		.separator {
			margin: 0 4px;
		}

		.tags {
			display: flex;
			gap: 8px;
			padding: 12px 0;
		}

		.btns {
			display: flex;
			justify-content: right;
		}

		.content {
			padding: 24px 0 100px 0;
			white-space: pre-line;
			overflow-wrap: break-word;
			word-break: keep-all;
			line-height: 2em;
			font-size: 1.1em;

			p {
				margin-bottom: 6px;
			}

			img {
				margin: 4px 0;
			}

			a {
				color: ${({ theme }) => theme.colors.onBlue};
				cursor: pointer;
				text-decoration: none;

				&:hover {
					text-decoration: underline;
				}
			}
		}
	}
`;

const PostCommentStyle = styled.div`
	/* 익명을 뚫기위한 비밀번호 입력 폼 */
	.anonymous-form {
		p {
			margin-bottom: 20px;
		}

		input {
			width: 100%;
			background-color: ${({ theme }) => theme.colors.primary};
			color: ${({ theme }) => theme.colors.onPrimary};
			padding: 6px 12px;
			border: none;
			border-bottom: 1px solid ${({ theme }) => theme.colors.border};
			font-size: 22px;

			@media screen and (max-width: 768px) {
				font-size: 20px;
			}
		}

		.buttons {
			margin-top: 28px;
			button + button {
				margin-left: 8px;
			}

			button {
				padding: 8px 18px;
			}
		}
	}

	.comment-container {
		width: 100%;
		padding: 24px 0;
		display: flex;
		flex-direction: column;

		.count {
			margin: 8px 0;
		}

		.comment-input {
			width: 100%;
			resize: none;
			padding: 8px;
			height: 100px;
			border-radius: 4px;
			outline: none;
			font-size: ${({ theme }) => theme.fontSizes.md};
			color: ${({ theme }) => theme.colors.onPrimary};
			background-color: ${({ theme }) => theme.colors.primary};
			border: 1px solid ${({ theme }) => theme.colors.border};

			&.edit {
				border: 1px solid ${({ theme }) => theme.colors.blue};
			}
		}

		form {
			display: flex;
			flex-direction: column;
			margin: 8px 0;

			.anonymous {
				display: flex;
				justify-content: flex-end;
				margin-top: 4px;
				gap: 2px;

				input {
					padding: 4px 8px;
					outline: none;
					border-radius: 4px;
					background-color: ${({ theme }) => theme.colors.primary};
					border: 1px solid ${({ theme }) => theme.colors.border};
					color: ${({ theme }) => theme.colors.onPrimary};
				}
			}

			button {
				width: fit-content;
				margin-top: 8px;
				margin-left: auto;
			}
		}
	}

	.comment-list {
		border-bottom: 1px solid ${({ theme }) => theme.colors.border};
		margin-bottom: 40px;
	}

	.comment-box {
		margin: 25px 0;
		width: 100%;
		padding: 0 8px;

		.comment-edit {
			display: flex;
			flex-direction: column;

			span {
				margin: 8px 0 8px auto;

				button + button {
					margin-left: 4px;
				}
			}
		}

		.box-title {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.user {
				div:nth-of-type(1) {
					font-weight: 700;
				}
				div:nth-of-type(2) {
					margin: 8px 0;
					font-size: ${({ theme }) => theme.fontSizes.sm};
				}
			}

			.etc {
				span {
					cursor: pointer;
					padding: 0 12px;
					color: ${({ theme }) => theme.colors.blue};
					font-size: 14px;

					&:hover {
						svg {
							transform: scale(1.2);
							transition: scale 300ms;
						}
					}
				}

				button + button {
					margin-left: 4px;
				}
			}
		}

		.text {
			padding: 8px 0;
			font-size: ${({ theme }) => theme.fontSizes.md};
		}

		.reply-btn {
			display: flex;
			justify-content: flex-end;
			align-items: center;
			color: ${({ theme }) => theme.colors.onPrimary};

			div {
				display: flex;
				align-items: center;

				svg {
					margin-top: 6px;
					cursor: pointer;
					background-color: #d7d7d71a;
				}

				button {
					color: ${({ theme }) => theme.colors.onBlue};

					&:hover {
						text-decoration: underline;
					}
				}
			}
		}
	}

	.reply-box {
		padding-left: 10px;
	}
`;

export { PostStyle, PostCommentStyle };
