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
		onBlue: '#1E90FF',
		onGreen: '#228B22',
		onRed: '	#8B0000',

		primary: '#ffffff',
		secondary: '#f5f5f5',
		blue: '#1E90FF',
		bgCode: '#dddddd',
		border: '#e2e2e2',
	},
	dark: {
		onPrimary: '#d7d7d7',
		onSecondary: '#d7d7d7e6',
		onBlue: '#6495ED',
		onGreen: '#98FB98',
		onRed: '#DC143C',

		primary: '#282a36',
		secondary: '#3e4153',
		blue: '#b0c4de',
		bgCode: '#343644',
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
