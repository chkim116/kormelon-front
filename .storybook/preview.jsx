import { ChakraProvider } from '@chakra-ui/react';
import { customTheme } from '../src/core/theme';

export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
};

export const decorators = [
	(Story) => (
		<ChakraProvider theme={customTheme}>
			<Story />
		</ChakraProvider>
	),
];
