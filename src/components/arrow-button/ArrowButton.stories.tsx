import type { Meta, StoryObj } from '@storybook/react';

import { ArrowButton } from './ArrowButton';

const meta: Meta<typeof ArrowButton> = {
	component: ArrowButton,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ArrowButton>;

export const ArrowButtonOpenStory: Story = {
	name: 'Кнопка в состоянии открытых настроек',
	render: () => {
		return (
			<>
				<ArrowButton
					isOpen={true}
					handleClickArrow={() => console.log('Открытие настроек')}
				/>
			</>
		);
	},
};

export const ArrowButtonCloseStory: Story = {
	name: 'Кнопка в состоянии закрытых настроек',
	storyName: 'sdfsd',
	render: () => {
		return (
			<>
				<ArrowButton
					isOpen={false}
					handleClickArrow={() => console.log('Закрытие настроек')}
				/>
			</>
		);
	},
};
