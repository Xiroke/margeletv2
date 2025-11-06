import { useRouter } from '@tanstack/react-router'

export const useShouldIgnorePath = (paths: Array<string>) => {
  const router = useRouter()
  const currentPath = router.state.location.pathname

  return paths.some((pattern) => {
    if (pattern === currentPath) return true

    if (pattern.endsWith('/*')) {
      const basePath = pattern.slice(0, -2)
      return currentPath.startsWith(basePath)
    }

    return false
  })
}
