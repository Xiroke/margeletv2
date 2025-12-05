export const settings = {
  VITE_BACKEND_URL: '',
  VITE_DEV_BACKEND_URL: 'http://localhost:8000',
}

export const excludedAuthCheckRoutes = ['/', '/login', '/registration', '/verify/*', '/backend/*']

/**
 * Check if the route matches the pathname
 */
export const matchesRoute = (route: string, pathname: string) => {
  return route.endsWith('*') ? pathname.startsWith(route.replace('*', '')) : pathname === route
}

export const getIsExcluded = (pathname: string) => {
  return excludedAuthCheckRoutes.some((route) =>
    matchesRoute(route, pathname),
  )
}
