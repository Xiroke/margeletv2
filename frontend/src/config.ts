export const settings = {
  VITE_BACKEND_URL: import.meta.env.VITE_BACKEND_URL,
  VITE_BACKEND_WS_URL: import.meta.env.VITE_BACKEND_WS_URL,
}

export const excludedAuthCheckRoutes = ['/', '/login', '/registration', '/verify/*']
