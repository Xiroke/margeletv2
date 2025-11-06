import type { Meta, StoryObj } from '@storybook/react-vite'

import { ChatMessagesLoader } from './ChatMessagesLoader'

const meta: Meta<typeof ChatMessagesLoader> = {
  component: ChatMessagesLoader,
  globals: { theme: 'light' },
  title: 'ChatMessagesLoader',
}

export default meta
type Story = StoryObj<typeof ChatMessagesLoader>

export const Light: Story = {
  args: {},
}

export const Dark: Story = {
  args: {},
  globals: { theme: 'dark' },
}
