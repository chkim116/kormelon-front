import '@emotion/react';

// emotion theme style
declare module '@emotion/react' {
	export interface Theme {
		fontSizes: {
			/**
			 * 12px
			 */
			xs: string;
			/**
			 * 13px
			 */
			sm: string;
			/**
			 * 15px
			 */
			md: string;
			/**
			 * 18px
			 */
			lg: string;
		};

		colors: {
			onPrimary: string;
			onSecondary: string;
			onBlue: string;

			primary: string;
			secondary: string;
			blue: string;
			bgCode: string;
			border: string;
		};
	}
}
