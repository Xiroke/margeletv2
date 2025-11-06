import type { Meta, StoryObj } from '@storybook/react-vite'

import { MessageList } from './MessageList'

const meta: Meta<typeof MessageList> = {
  component: MessageList,
  globals: { theme: 'light' },
  title: 'MessageList',
}

export default meta
type Story = StoryObj<typeof MessageList>

export const Light: Story = {
  args: {},
}

export const Dark: Story = {
  args: {},
  globals: { theme: 'dark' },
}
