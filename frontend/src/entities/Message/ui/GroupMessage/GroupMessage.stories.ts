import type { Meta, StoryObj } from '@storybook/react-vite';

import { GroupMessage } from './GroupMessage';

const meta: Meta<typeof GroupMessage> = {
  title: 'GroupMessage',
  component: GroupMessage,
  globals: { theme: 'light' },
};

export default meta;
type Story = StoryObj<typeof GroupMessage>;

export const Light: Story = {
  args: {},
};

export const Dark: Story = {
  args: {},
  globals: { theme: 'dark' },
};
