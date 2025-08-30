import type { Meta, StoryObj } from '@storybook/react-vite';

import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Input',
  component: Input,
  globals: { theme: 'light' },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Light: Story = {
  args: {},
};

export const Dark: Story = {
  args: {},
  globals: { theme: 'dark' },
};
