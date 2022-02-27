import styled from '@emotion/styled';

const SettingStyle = styled.div`
	input {
		border: none;
		border-bottom: 1px solid ${({ theme }) => theme.colors.border};
		background-color: ${({ theme }) => theme.colors.primary};
		max-width: 300px;
		width: 100%;
		color: ${({ theme }) => theme.colors.onPrimary};
	}

	button {
		width: 50px;
	}

	.parent-form {
		margin-bottom: 40px;
		display: flex;
		gap: 8px;
	}

	.category-list {
		display: flex;

		.parent-category {
			display: flex;
			justify-content: space-between;
			padding: 8px 0;
			border-bottom: 1px solid ${({ theme }) => theme.colors.border};
			span {
				font-size: ${({ theme }) => theme.fontSizes.lg};
				display: flex;
				gap: 4px;
				button {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 50px;
					padding: 0;
				}
			}

			/* 수정시 */
			.edit-category {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				input {
					font-size: ${({ theme }) => theme.fontSizes.lg};
				}
				button {
					padding: 4px 0;
				}
			}
		}

		.category-sub-list {
			padding: 8px;
			li {
				display: flex;
				justify-content: space-between;
				padding: 4px 0;

				span {
					display: flex;
					gap: 4px;
					button {
						display: flex;
						align-items: center;
						justify-content: center;
						width: 32px;
						padding: 2px 6px;
					}
				}

				.edit-sub-category {
					width: 100%;
					justify-content: space-between;
					display: flex;

					input {
						font-size: ${({ theme }) => theme.fontSizes.md};
					}

					span {
						gap: 4px;
						display: flex;
					}
				}
			}
			.sub-form {
				display: flex;
				gap: 8px;

				span {
					display: flex;
					align-items: center;
					gap: 4px;
				}
			}
		}
	}
`;

export default SettingStyle;
