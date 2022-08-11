import { ComponentProps } from 'react';
import { ComponentStory, ComponentMeta, ArgTypes } from '@storybook/react';

import { Section } from '@common/components/Section';
import { postListFixture } from '@features/posts/_fixtures/postList.fixture';
import { PostList } from '../PostList';

type MyArgTypes = Partial<
	Record<keyof ComponentProps<typeof PostList>, ArgTypes[string]>
>;
const argTypes: MyArgTypes = {};

export default {
	title: 'posts/search/PostList',
	component: PostList,
	argTypes,
} as ComponentMeta<typeof PostList>;

const Template: ComponentStory<typeof PostList> = ({ ...props }) => {
	return (
		<Section>
			<PostList {...props}></PostList>
		</Section>
	);
};

export const Default = Template.bind({});
Default.args = {
	postList: postListFixture,
	loading: false,
};

export const Empty = Template.bind({});
Empty.args = {
	postList: [],
	loading: false,
};

export const Loading = Template.bind({});
Loading.args = {
	postList: postListFixture,
	loading: true,
};
