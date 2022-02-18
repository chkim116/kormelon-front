import styled from '@emotion/styled';

const PostStyle = styled.div`
	display: flex;
	width: 100%;

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

		.title {
		}

		.category {
			margin-bottom: 8px;
		}

		.separator {
			margin: 0 4px;
		}

		.tags {
			display: flex;
			gap: 8px;
			padding: 12px 0;
		}

		.content {
			padding: 24px 0 100px 0;
		}
	}
`;

const PostCommentStyle = styled.div`
	.comment-container {
		width: 100%;
		padding: 24px 0;
		display: flex;
		flex-direction: column;

		.count {
			margin: 8px 0;
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
			textarea {
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

		.user {
			div:nth-of-type(1) {
				font-weight: 700;
			}
			div:nth-of-type(2) {
				margin: 8px 0;
				font-size: ${({ theme }) => theme.fontSizes.sm};
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

			svg {
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

	.reply-box {
		padding-left: 10px;
	}
`;

export { PostStyle, PostCommentStyle };
