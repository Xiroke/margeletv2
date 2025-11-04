import type { Meta, StoryObj } from '@storybook/react-vite';

import { Tag } from './Tag';


const meta: Meta<typeof Tag> = {
  component: Tag,
  globals: { theme: 'light' },
  title: 'Tag',
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Light: Story = {
  args: {},
};

export const Dark: Story = {
  args: {},
  globals: { theme: 'dark' },
};
