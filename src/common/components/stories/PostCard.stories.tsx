import { ComponentProps } from 'react';
import { ComponentStory, ComponentMeta, ArgTypes } from '@storybook/react';
import { PostCard } from '../PostCard';

type MyArgTypes = Partial<
	Record<keyof ComponentProps<typeof PostCard>, ArgTypes[string]>
>;
const argTypes: MyArgTypes = {};

export default {
	title: 'common/PostCard',
	component: PostCard,
	argTypes,
} as ComponentMeta<typeof PostCard>;

const Template: ComponentStory<typeof PostCard> = ({ ...props }) => {
	const POSTS = {
		id: 1,
		title: '제목1',
		date: '2022-06-24',
		readTime: '2min',
		thumbnail:
			'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
	};

	return <PostCard {...props} post={POSTS}></PostCard>;
};

export const Default = Template.bind({});
Default.args = {};
