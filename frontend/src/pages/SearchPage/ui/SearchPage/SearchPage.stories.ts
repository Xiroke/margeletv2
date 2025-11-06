import type { Meta, StoryObj } from '@storybook/react-vite'

import { SearchPage } from './SearchPage'

const meta: Meta<typeof SearchPage> = {
  component: SearchPage,
  globals: { theme: 'light' },
  title: 'SearchPage ',
}

export default meta
type Story = StoryObj<typeof SearchPage>

export const Light: Story = {
  args: {},
}

export const Dark: Story = {
  args: {},
  globals: { theme: 'dark' },
}
