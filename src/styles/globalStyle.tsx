import emotionReset from 'emotion-reset';
import { css, Global } from '@emotion/react';

export const GlobalStyle = () => {
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
