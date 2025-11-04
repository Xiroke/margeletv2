import type { Meta, StoryObj } from '@storybook/react-vite';

import { Separator } from './Separator';


const meta: Meta<typeof Separator> = {
  component: Separator,
  globals: { theme: 'light' },
  title: 'Separator ',
};

export default meta;
type Story = StoryObj<typeof Separator>;

export const Light: Story = {
  args: {},
};

export const Dark: Story = {
  args: {},
  globals: { theme: 'dark' },
};
