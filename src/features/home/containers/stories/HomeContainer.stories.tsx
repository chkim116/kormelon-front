import { ComponentProps } from 'react';
import { ComponentStory, ComponentMeta, ArgTypes } from '@storybook/react';
import { HomeContainer } from '../HomeContainer';

type MyArgTypes = Partial<
	Record<keyof ComponentProps<typeof HomeContainer>, ArgTypes[string]>
>;
const argTypes: MyArgTypes = {};

export default {
	title: 'home/containers/HomeContainer',
	component: HomeContainer,
	argTypes,
} as ComponentMeta<typeof HomeContainer>;

const Template: ComponentStory<typeof HomeContainer> = () => {
	return <HomeContainer></HomeContainer>;
};

export const Default = Template.bind({});
Default.args = {};
