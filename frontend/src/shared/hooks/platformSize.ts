import { useMediaQuery } from 'usehooks-ts'

export const useIsTablet = () => useMediaQuery('(max-width: 1024px)')
export const useIsMedium = () => useMediaQuery('(max-width: 768px)')
export const useIsPhone = () => useMediaQuery('(max-width: 576px)')
