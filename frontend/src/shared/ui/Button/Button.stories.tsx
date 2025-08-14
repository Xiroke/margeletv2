import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
  globals: { theme: 'light' },
}

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: {
    styleType: 'default',
    size: 'sm',
    children: 'Button',
  },
}

export const Inverse: Story = {
  args: {
    styleType: 'inverse',
    size: 'sm',
    children: 'Button',
  },
}

export const Text: Story = {
  args: {
    styleType: 'text',
    size: 'sm',
    children: 'Button',
  },
}

export const TextDark: Story = {
  args: {
    styleType: 'text',
    size: 'sm',
    children: 'Button',
  },
  globals: {
    theme: 'dark',
  },
}

export const Outline: Story = {
  args: {
    styleType: 'outline',
    size: 'sm',
    children: 'Button',
  },
}

export const OutlineDark: Story = {
  args: {
    styleType: 'outline',
    size: 'sm',
    children: 'Button',
  },
  globals: {
    theme: 'dark',
  },
}
