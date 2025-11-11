import type { Meta, StoryObj } from '@storybook/react-vite'

import { UserCard } from './UserCard'

const meta: Meta<typeof UserCard> = {
  component: UserCard,
  globals: { theme: 'light' },
  title: 'UserCard ',
}

export default meta
type Story = StoryObj<typeof UserCard>

export const Light: Story = {
  args: {},
}

export const Dark: Story = {
  args: {},
  globals: { theme: 'dark' },
}
