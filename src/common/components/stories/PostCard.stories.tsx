import { ComponentProps } from 'react';
import { ComponentStory, ComponentMeta, ArgTypes } from '@storybook/react';
import { postListFixture } from '@features/posts/_fixtures/postList.fixture';
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
	const post = postListFixture[0];

	return <PostCard {...props} post={post}></PostCard>;
};

export const Default = Template.bind({});
Default.args = {};
