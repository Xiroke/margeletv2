import type { WsBaseEvent } from '../api/generated'

export interface IWSContext {
  isConnected: boolean
  onMessage: (callback: (data: WsBaseEvent) => void) => void
  send: (data: string) => void
}
