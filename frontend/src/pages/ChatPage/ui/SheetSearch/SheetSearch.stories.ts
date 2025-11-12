import type { Meta, StoryObj } from '@storybook/react-vite'

import { SheetSearch } from './SheetSearch'

const meta: Meta<typeof SheetSearch> = {
  component: SheetSearch,
  globals: { theme: 'light' },
  title: 'SheetSearch ',
}

export default meta
type Story = StoryObj<typeof SheetSearch>

export const Light: Story = {
  args: {},
}

export const Dark: Story = {
  args: {},
  globals: { theme: 'dark' },
}
