import type { Meta, StoryObj } from '@storybook/react-vite'

import { GroupCard } from './GroupCard'

const meta: Meta<typeof GroupCard> = {
  component: GroupCard,
  globals: { theme: 'light' },
  title: 'GroupCard ',
}

export default meta
type Story = StoryObj<typeof GroupCard>

export const Light: Story = {
  args: {},
}

export const Dark: Story = {
  args: {},
  globals: { theme: 'dark' },
}
