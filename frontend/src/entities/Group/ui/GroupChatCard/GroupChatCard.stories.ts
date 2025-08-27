import type { Meta, StoryObj } from '@storybook/react-vite';

import { GroupCard } from './GroupChatCard';

const meta: Meta<typeof GroupCard> = {
  title: 'GroupCard',
  component: GroupCard,
  globals: { theme: 'light' },
};

export default meta;
type Story = StoryObj<typeof GroupCard>;

export const Light: Story = {
  args: {},
};

export const Dark: Story = {
  args: {},
  globals: { theme: 'dark' },
};
