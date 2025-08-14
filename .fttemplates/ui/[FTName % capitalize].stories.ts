import type { Meta, StoryObj } from '@storybook/react-vite';

import { <FTName | capitalize> } from './<FTName | capitalize>';

const meta: Meta<typeof <FTName | capitalize>> = {
    title: '<FTName | capitalize>',
    component: <FTName | capitalize>,
    globals: { theme: 'light' },
};

export default meta;
type Story = StoryObj<typeof <FTName | capitalize>>;

export const Light: Story = {
    args: {},
};

export const Dark: Story = {
    args: {},
    globals: { theme: 'dark' },
};

