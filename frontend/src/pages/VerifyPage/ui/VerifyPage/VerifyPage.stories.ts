import type { Meta, StoryObj } from '@storybook/react-vite';

import { VerifyPage } from './VerifyPage';

const meta: Meta<typeof VerifyPage> = {
    component: VerifyPage,
    globals: { theme: 'light' },
    title: 'VerifyPage ',
};

export default meta;
type Story = StoryObj<typeof VerifyPage>;

export const Light: Story = {
    args: {},
};

export const Dark: Story = {
    args: {},
    globals: { theme: 'dark' },
};
