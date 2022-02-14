import emotionReset from 'emotion-reset';
import { css, Global, Theme } from '@emotion/react';

export const GlobalStyle = ({ theme }: { theme: Theme }) => {
	return (
		<Global
			styles={css`
				@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;600;700&display=swap');

				${emotionReset}

				* {
					box-sizing: border-box;
					font-family: 'IBM Plex Sans', sans-serif !important;
				}

				body {
					font-size: ${theme.fontSizes.md};
					color: ${theme.colors.onPrimary};
					margin-top: 50px;
				}

				h1 {
					font-size: 30px;
					font-weight: 600;
				}

				h2 {
					font-size: 26px;
					font-weight: 600;
				}

				p {
				}

				small {
					font-size: ${theme.fontSizes.sm};
					font-weight: 300;
				}

				a {
					color: inherit;
					text-decoration: none;
				}
			`}
		></Global>
	);
};
