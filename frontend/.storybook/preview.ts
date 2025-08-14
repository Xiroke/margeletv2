import type { Preview } from '@storybook/react-vite'
import { withThemeByClassName } from '@storybook/addon-themes'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
}

export default preview

export const decorators = [
  withThemeByClassName({
    themes: {
      light: 'light-theme',
      dark: 'dark-theme',
    },
    defaultTheme: 'light',
  }),
]

//connect global css to storybook
if (typeof document !== 'undefined') {
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = '/styles.css'
  document.head.appendChild(link)
}
