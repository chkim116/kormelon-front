import { ComponentProps } from 'react';
import { ComponentStory, ComponentMeta, ArgTypes } from '@storybook/react';
import { Layouts } from '../Layouts';

type MyArgTypes = Partial<
	Record<keyof ComponentProps<typeof Layouts>, ArgTypes[string]>
>;
const argTypes: MyArgTypes = {};

export default {
	title: 'common/Layouts',
	component: Layouts,
	argTypes,
} as ComponentMeta<typeof Layouts>;

const Template: ComponentStory<typeof Layouts> = ({ ...props }) => {
	return (
		<Layouts {...props}>
			<div>children이 필요해요~</div>
		</Layouts>
	);
};

export const Default = Template.bind({});
Default.args = {};
