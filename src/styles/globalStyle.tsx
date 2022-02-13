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
				}
			`}
		></Global>
	);
};
