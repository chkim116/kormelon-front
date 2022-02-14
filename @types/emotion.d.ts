import '@emotion/react';

// emotion theme style
declare module '@emotion/react' {
	export interface Theme {
		fontSizes: {
			/**
			 * 12px
			 */
			sm: string;
			/**
			 * 14px
			 */
			md: string;
			/**
			 * 16px
			 */
			lg: string;
			/**
			 * 18px
			 */
			xl: string;
		};

		colors: {
			onPrimary: string;
			onSecondary: string;

			primary: string;

			border: string;
		};
	}
}
