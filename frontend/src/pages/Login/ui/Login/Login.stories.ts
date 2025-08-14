import type { Meta, StoryObj } from '@storybook/react-vite';

import { Login } from './Login';

const meta: Meta<typeof Login> = {
    title: 'Login',
    component: Login,
    globals: { theme: 'light' },
};

export default meta;
type Story = StoryObj<typeof Login>;

export const Light: Story = {
    args: {},
};

export const Dark: Story = {
    args: {},
    globals: { theme: 'dark' },
};

