import '@emotion/react';

// emotion theme style
declare module '@emotion/react' {
	export interface Theme {
		fontSizes: {
			sm: string;
			md: string;
			lg: string;
			xl: string;
		};
	}
}
