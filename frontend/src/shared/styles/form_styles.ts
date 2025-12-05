export const FORM_STYLES = {
  button: 'px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors',
  footer: 'text-center text-[15px] text-gray-600',
  form: 'w-full max-w-[320px] mx-auto my-20 p-8 bg-[var(--card)] rounded-xl flex flex-col justify-center items-stretch gap-4',
  input: 'px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500',
  subtitle: 'text-center mb-2',
  title: 'font-semibold text-center -mb-2 whitespace-nowrap',
} as const

export type FormStyleKey = keyof FormStyles
export type FormStyles = typeof FORM_STYLES
