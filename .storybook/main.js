const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
	framework: '@storybook/react',
	stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'storybook-addon-next',
	],
	core: {
		builder: '@storybook/builder-webpack5',
	},
	features: {
		storyStoreV7: true,
	},
	webpackFinal: async (config) => {
		config.resolve.plugins = [new TsconfigPathsPlugin()];
		return config;
	},
};
