const fontSizes = {
	xs: '12px',
	sm: '13px',
	md: '15px',
	lg: '18px',
};

/**
 * prefix on* : font ...etc
 */
const darkOrLightColors = {
	light: {
		onPrimary: '#2e2e2e',
		onSecondary: '#2e2e2ef2',

		primary: '#ffffff',

		border: '#e2e2e2',
	},
	dark: {
		onPrimary: '#d7d7d7',
		onSecondary: '#d7d7d7e6',

		primary: '#282a36',

		border: '#414141',
	},
};

export const theme = (mode: 'dark' | 'light') => {
	return {
		fontSizes,
		colors: {
			...darkOrLightColors[mode],
		},
	};
};

export const ThemeType = typeof theme('dark');
