import type { Meta, StoryObj } from '@storybook/react-vite'

import { BackButton } from './BackButton'

const meta: Meta<typeof BackButton> = {
  component: BackButton,
  globals: { theme: 'light' },
  title: 'BackButton ',
}

export default meta
type Story = StoryObj<typeof BackButton>

export const Light: Story = {
  args: {},
}

export const Dark: Story = {
  args: {},
  globals: { theme: 'dark' },
}
