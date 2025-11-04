import type { Preview } from '@storybook/react-vite'

import { withThemeByClassName } from '@storybook/addon-themes'

const preview: Preview = {
  parameters: {
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },

    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview

export const decorators = [
  withThemeByClassName({
    defaultTheme: 'light',
    themes: {
      dark: 'dark-theme',
      light: 'light-theme',
    },
  }),
]

//connect global css to storybook
if (typeof document !== 'undefined') {
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = '/styles.css'
  document.head.appendChild(link)
}
