import type { Meta, StoryObj } from '@storybook/react-vite'

import { CreateSimpleGroupPage } from './CreateSimpleGroupPage'

const meta: Meta<typeof CreateSimpleGroupPage> = {
  component: CreateSimpleGroupPage,
  globals: { theme: 'light' },
  title: 'CreateSimpleGroupPage ',
}

export default meta
type Story = StoryObj<typeof CreateSimpleGroupPage>

export const Light: Story = {
  args: {},
}

export const Dark: Story = {
  args: {},
  globals: { theme: 'dark' },
}
