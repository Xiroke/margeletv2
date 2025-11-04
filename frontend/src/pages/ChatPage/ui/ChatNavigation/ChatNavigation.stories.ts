import type { Meta, StoryObj } from '@storybook/react-vite';

import { ChatNavigation } from './ChatNavigation';


const meta: Meta<typeof ChatNavigation> = {
  component: ChatNavigation,
  globals: { theme: 'light' },
  title: 'ChatNavigation ',
};

export default meta;
type Story = StoryObj<typeof ChatNavigation>;

export const Light: Story = {
  args: {},
};

export const Dark: Story = {
  args: {},
  globals: { theme: 'dark' },
};
