import type { Meta, StoryObj } from '@storybook/react-vite'

import { __UINameCase__ } from './__UINameCase__'

const meta: Meta<typeof __UINameCase__> = {
  component: __UINameCase__,
  globals: { theme: 'light' },
  title: '__UINameCase__ ',
}

export default meta
type Story = StoryObj<typeof __UINameCase__>

export const Light: Story = {
  args: {},
}

export const Dark: Story = {
  args: {},
  globals: { theme: 'dark' },
}
