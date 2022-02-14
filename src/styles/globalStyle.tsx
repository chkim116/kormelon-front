import emotionReset from 'emotion-reset';
import { css, Global, Theme } from '@emotion/react';

export const GlobalStyle = ({ theme }: { theme: Theme }) => {
	return (
		<Global
			styles={css`
				${emotionReset}

				* {
					box-sizing: border-box;
				}

				body {
					font-size: 14px;
					margin-top: 50px;
					color: ${theme.colors.onPrimary};
				}

				h1 {
					font-size: 30px;
					font-weight: 500;
				}

				h2 {
					font-size: 24px;
					font-weight: 500;
				}

				p {
					font-size: 16px;
				}

				a {
					color: inherit;
					text-decoration: none;
				}
			`}
		></Global>
	);
};
