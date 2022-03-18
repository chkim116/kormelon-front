import emotionReset from 'emotion-reset';
import { css, Global, Theme } from '@emotion/react';

export const GlobalStyle = ({ theme }: { theme: Theme }) => {
	return (
		<Global
			styles={css`
				@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;600;700&display=swap');
				@import url('https://fonts.googleapis.com/css2?family=Fira+Code&display=swap');

				${emotionReset}

				* {
					box-sizing: border-box;
					font-family: 'IBM Plex Sans', sans-serif !important;
					-webkit-font-smoothing: antialiased;
					-moz-osx-font-smoothing: grayscale;
				}

				body {
					font-size: ${theme.fontSizes.md};
					color: ${theme.colors.onPrimary};
					margin-top: 50px;
					letter-spacing: 0.02em;
					line-height: 1.65em;
				}

				h1 {
					font-size: 30px;
					font-weight: 700;
				}

				h2 {
					font-size: 26px;
					font-weight: 700;
				}

				h3 {
					font-size: 22px;
					font-weight: 700;
				}

				h4 {
					font-size: 20px;
					font-weight: 700;
				}

				/* 마크다운 부분 세팅 */

				blockquote {
					border-left: 6px solid ${theme.colors.border};
					background-color: ${theme.colors.primary};
					padding-left: 1em;
					line-height: 1em;
					font-weight: 600;
				}

				em {
					font-style: italic;
				}

				strong,
				b {
					font-weight: 700;
				}

				table,
				th,
				tr,
				td {
					border: 1px solid ${theme.colors.border};
				}

				td {
					padding: 6px;
				}

				ul,
				ol {
					display: flex;
					flex-direction: column;
					padding: 0;
					margin: 0;
					list-style: inside;
				}

				ol {
					list-style: decimal inside;
				}

				img {
					width: 100%;
				}

				pre {
					margin: 8px 0;
					line-height: 1.55em;
					letter-spacing: -0.04em;
					box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;

					* {
						font-family: 'Fira Code' !important;
					}

					code {
						// scroll bar
						&::-webkit-scrollbar {
							height: 8px;
						}
						&::-webkit-scrollbar-track {
							background-color: #333333;
						}
						&::-webkit-scrollbar-thumb {
							height: 17%;
							border-radius: 10px;
							background-color: #666565;
						}
					}
				}

				/* 인라인 코드  */
				code {
					color: ${theme.colors.onSecondary};
					background-color: ${theme.colors.bgCode};
					padding: 1px 4px;
					border-radius: 4px;
				}
				/* 코드 작성 부분 전체 세팅 끝 */

				small {
					font-size: ${theme.fontSizes.sm};
					font-weight: 300;
					color: ${theme.colors.onSecondary};
				}

				a {
					cursor: pointer;
					text-decoration: none;
					color: ${theme.colors.onPrimary};
				}

				button {
					background-color: transparent;
					cursor: pointer;
					border: none;
				}

				input {
					outline: none;
					border: 1px solid ${theme.colors.border};
				}

				textarea {
					outline: none;
					border: 1px solid ${theme.colors.border};
				}
			`}
		></Global>
	);
};
