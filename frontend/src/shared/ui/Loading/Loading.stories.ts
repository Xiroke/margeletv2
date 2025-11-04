import type { Meta, StoryObj } from '@storybook/react-vite';

import { Loading } from './Loading';


const meta: Meta<typeof Loading> = {
  component: Loading,
  globals: { theme: 'light' },
  title: 'Loading ',
};

export default meta;
type Story = StoryObj<typeof Loading>;

export const Light: Story = {
  args: {},
};

export const Dark: Story = {
  args: {},
  globals: { theme: 'dark' },
};
