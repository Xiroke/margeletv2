import type { WsEventRead } from '../api/generated'

export interface IWSContext {
  isConnected: boolean
  onMessage: (callback: (data: WsEventRead) => void) => void
  send: (data: string) => void
}
