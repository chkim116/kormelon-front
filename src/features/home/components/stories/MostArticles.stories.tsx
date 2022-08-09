/* eslint-disable no-alert */
import { ComponentProps } from 'react';
import { ComponentStory, ComponentMeta, ArgTypes } from '@storybook/react';
import { MostArticles } from '../MostArticles';

type MyArgTypes = Partial<
	Record<keyof ComponentProps<typeof MostArticles>, ArgTypes[string]>
>;
const argTypes: MyArgTypes = {};

export default {
	title: 'Home/MostArticles',
	component: MostArticles,
	argTypes,
} as ComponentMeta<typeof MostArticles>;

const Template: ComponentStory<typeof MostArticles> = () => {
	return <MostArticles></MostArticles>;
};

export const Default = Template.bind({});
Default.args = {};
