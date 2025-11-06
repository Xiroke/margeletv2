import type { WsInDataSchema, WsOutDataSchema } from '../api/generated'

export interface IWSContext {
  isConnected: boolean
  onMessage: (callback: (data: WsOutDataSchema) => void) => void
  send: (data: WsInDataSchema) => void
}
