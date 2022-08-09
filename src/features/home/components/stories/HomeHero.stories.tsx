/* eslint-disable no-alert */
import { ComponentProps } from 'react';
import { ComponentStory, ComponentMeta, ArgTypes } from '@storybook/react';
import { HomeHero } from '../HomeHero';

type MyArgTypes = Partial<
	Record<keyof ComponentProps<typeof HomeHero>, ArgTypes[string]>
>;
const argTypes: MyArgTypes = {};

export default {
	title: 'Home/HomeHero',
	component: HomeHero,
	argTypes,
} as ComponentMeta<typeof HomeHero>;

const Template: ComponentStory<typeof HomeHero> = () => {
	return <HomeHero></HomeHero>;
};

export const Default = Template.bind({});
Default.args = {};
