import { ComponentProps } from 'react';
import { ComponentStory, ComponentMeta, ArgTypes } from '@storybook/react';
import { PostSearchBar } from '../PostSearchBar';

type MyArgTypes = Partial<
	Record<keyof ComponentProps<typeof PostSearchBar>, ArgTypes[string]>
>;
const argTypes: MyArgTypes = {};

export default {
	title: 'posts/search/PostSearchBar',
	component: PostSearchBar,
	argTypes,
} as ComponentMeta<typeof PostSearchBar>;

const Template: ComponentStory<typeof PostSearchBar> = ({ ...props }) => {
	return <PostSearchBar {...props}></PostSearchBar>;
};

export const Default = Template.bind({});
Default.args = {};
