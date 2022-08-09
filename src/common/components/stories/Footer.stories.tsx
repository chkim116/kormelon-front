import { ComponentProps } from 'react';
import { ComponentStory, ComponentMeta, ArgTypes } from '@storybook/react';
import { Footer } from '../Footer';

type MyArgTypes = Partial<
	Record<keyof ComponentProps<typeof Footer>, ArgTypes[string]>
>;
const argTypes: MyArgTypes = {};

export default {
	title: 'common/Footer',
	component: Footer,
	argTypes,
} as ComponentMeta<typeof Footer>;

const Template: ComponentStory<typeof Footer> = () => {
	return <Footer></Footer>;
};

export const Default = Template.bind({});
Default.args = {};
