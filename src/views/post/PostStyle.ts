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
		white-space: pre-line;

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
			a {
				background-color: #d7d7d71a;
				color: ${({ theme }) => theme.colors.onSecondary};
				padding: 6px 12px;
				font-size: ${({ theme }) => theme.fontSizes.sm};
			}
		}

		.content {
			padding: 24px 0;
		}

		code {
			padding: 2px 6px;
			border-radius: 8px;
			background-color: #d7d7d71a;
		}

		/* code.. */
		pre {
			white-space: pre-line;
			line-height: 1.45rem;
			margin: 12px 0;
			padding: 12px;
			background-color: #17181b;
			box-shadow: 2px 2px 4px #212227;

			code {
				background-color: transparent;
			}
		}
	}

	.comment-container {
		width: 100%;
		display: flex;
		flex-direction: column;

		form {
			display: flex;
			flex-direction: column;
			margin: 8px 0;

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
				padding: 8px 12px;
				border-radius: 4px;
				background-color: ${({ theme }) => theme.colors.blue};
				color: ${({ theme }) => theme.colors.primary};
				font-size: ${({ theme }) => theme.fontSizes.sm};
			}
		}

		.comment-list {
			width: 100%;
		}
	}
`;

export default PostStyle;
