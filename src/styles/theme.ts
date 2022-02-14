const fontSizes = {
	sm: '12px',
	md: '14px',
	lg: '16px',
	xl: '18px',
};

/**
 * prefix on* : font ...etc
 */
const darkOrLightColors = {
	light: {
		onPrimary: '#2e2e2e',
		onSecondary: '#2e2e2ef2',

		primary: '#ffffff',

		border: '#f8f8f8',
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
