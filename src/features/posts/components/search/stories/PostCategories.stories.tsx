import { ComponentProps } from 'react';
import { ComponentStory, ComponentMeta, ArgTypes } from '@storybook/react';
import { PostCategories } from '../PostCategories';

type MyArgTypes = Partial<
	Record<keyof ComponentProps<typeof PostCategories>, ArgTypes[string]>
>;
const argTypes: MyArgTypes = {};

export default {
	title: 'posts/search/PostCategories',
	component: PostCategories,
	argTypes,
} as ComponentMeta<typeof PostCategories>;

const Template: ComponentStory<typeof PostCategories> = ({ ...props }) => {
	return <PostCategories {...props}></PostCategories>;
};

export const Default = Template.bind({});
Default.args = {};
