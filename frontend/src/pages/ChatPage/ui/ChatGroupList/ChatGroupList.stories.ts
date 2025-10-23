import type { Meta, StoryObj } from '@storybook/react-vite';

import { ChatGroupList } from './ChatGroupList';

const meta: Meta<typeof ChatGroupList> = {
    title: 'ChatGroupList',
    component: ChatGroupList,
    globals: { theme: 'light' },
};

export default meta;
type Story = StoryObj<typeof ChatGroupList>;

export const Light: Story = {
    args: {},
};

export const Dark: Story = {
    args: {},
    globals: { theme: 'dark' },
};

