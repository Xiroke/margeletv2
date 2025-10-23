import type { Meta, StoryObj } from '@storybook/react-vite';

import { MessageList } from './MessageList';

const meta: Meta<typeof MessageList> = {
    title: 'MessageList',
    component: MessageList,
    globals: { theme: 'light' },
};

export default meta;
type Story = StoryObj<typeof MessageList>;

export const Light: Story = {
    args: {},
};

export const Dark: Story = {
    args: {},
    globals: { theme: 'dark' },
};

