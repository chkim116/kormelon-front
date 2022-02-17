import styled from '@emotion/styled';

const PostWriteStyle = styled.div`
	max-width: 1000px;
	width: 100%;

	/* 임시 저장 목록 */
	.save-loader {
		width: 100%;
		display: flex;
		justify-content: flex-end;
		margin-bottom: 20px;
	}

	.modal-body {
		max-width: 500px;
		width: 100%;
	}

	.load-list {
		display: flex;
		flex-direction: column;
		width: 100%;
		gap: 14px;

		li {
			position: relative;
			text-align: left;
			padding: 12px 0;
			cursor: pointer;
			border-bottom: 1px solid ${({ theme }) => theme.colors.border};
			width: 100%;

			&:hover {
				opacity: 0.7;
			}

			.load-delete {
				position: absolute;
				top: 50%;
				right: 0;

				&:hover {
					transform: scale(1.1);
				}
			}
		}
	}

	form {
		padding-bottom: 100px;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;

		input,
		textarea {
			background-color: ${({ theme }) => theme.colors.primary};
			color: ${({ theme }) => theme.colors.onPrimary};
		}

		.title {
			max-width: 600px;
			width: 100%;
			padding: 8px 0;
			border: none;
			border-bottom: 1px solid ${({ theme }) => theme.colors.border};
			font-size: ${({ theme }) => theme.fontSizes.lg};
			margin-bottom: 12px;
		}

		.cascader {
			position: relative;
			margin-bottom: 12px;
			z-index: 10;

			button {
				width: 100%;
				text-align: left;
				padding: 8px 0;
				color: ${({ theme }) => theme.colors.onPrimary};
				border-bottom: 1px solid ${({ theme }) => theme.colors.border};
			}
			.category {
				position: absolute;

				.category-list {
					display: flex;
					position: relative;
					font-size: ${({ theme }) => theme.fontSizes.md};
					width: fit-content;

					&.active {
						border-left: 1px solid ${({ theme }) => theme.colors.blue};
					}

					& > div {
						display: flex;
						align-items: center;
						justify-content: space-between;
						background-color: ${({ theme }) => theme.colors.primary};
						color: ${({ theme }) => theme.colors.onPrimary};
						width: 200px;
						padding: 8px 6px;
						cursor: pointer;
						border: 1px solid ${({ theme }) => theme.colors.border};
						&:hover {
							background-color: ${({ theme }) => theme.colors.onBlue};
						}
					}

					.sub-category {
						position: absolute;
						left: 200px;
						background-color: ${({ theme }) => theme.colors.primary};
						color: ${({ theme }) => theme.colors.onPrimary};
						max-width: 200px;
						width: 100%;
						border: 1px solid ${({ theme }) => theme.colors.border};

						li {
							cursor: pointer;
							padding: 10px 6px;

							&:hover {
								background: ${({ theme }) => theme.colors.onBlue};
							}
						}

						li ~ li {
							border-top: 1px solid ${({ theme }) => theme.colors.border};
						}
					}
				}
			}
		}

		.tag-container {
			position: relative;

			input {
				padding: 8px 0;
				border: none;
				border-bottom: 1px solid ${({ theme }) => theme.colors.border};
				margin-bottom: 24px;
				width: 150px;
			}

			.tags-list {
				display: flex;
				gap: 8px;
				cursor: pointer;
			}

			.tag-search {
				position: absolute;
				top: 40px;
				min-width: 150px;
				background-color: ${({ theme }) => theme.colors.primary};
				color: ${({ theme }) => theme.colors.onPrimary};
				border: 1px solid ${({ theme }) => theme.colors.border};

				li {
					cursor: pointer;
					display: flex;
					justify-content: space-between;
					gap: 12px;
					padding: 12px;

					&:hover {
						opacity: 0.56;
					}
				}

				li ~ li {
					border-top: 1px solid ${({ theme }) => theme.colors.border};
				}
			}
		}

		.content-container {
			padding: 24px 0;
			width: 100%;
			display: flex;
			flex-direction: column;

			.preview-btn {
				@media all and (max-width: 800px) {
					display: none;
				}

				padding: 4px 8px;
				width: fit-content;
				border-radius: 4px;
				margin-left: auto;
				margin-bottom: 8px;
				background-color: ${({ theme }) => theme.colors.blue};
				color: ${({ theme }) => theme.colors.primary};
			}

			& > div {
				width: 100%;
				display: flex;
				gap: 8px;

				.editor {
					display: flex;
					flex-direction: column;
					width: 100%;

					.content {
						width: 100%;
						height: 80vh;
						padding: 8px;
						font-size: ${({ theme }) => theme.fontSizes.md};

						&.drag {
							border: 1px solid ${({ theme }) => theme.colors.blue};
						}
					}
				}

				.preview {
					@media all and (max-width: 800px) {
						display: none;
					}
					width: 100%;
					height: 80vh;
					padding: 8px;
					border: 1px solid ${({ theme }) => theme.colors.border};
					font-size: ${({ theme }) => theme.fontSizes.md};
				}
			}
		}

		.footer {
			display: flex;
			justify-content: space-between;
			gap: 4px;

			button {
				width: 80px;

				&[type='submit'] {
				}

				&[type='button'] {
				}
			}

			& > div {
				display: flex;
				gap: 4px;
			}
		}
	}
`;

export default PostWriteStyle;
