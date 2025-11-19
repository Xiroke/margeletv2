import type { EntityTable } from 'dexie'

import Dexie from 'dexie'

import type { MessageRead } from './api/generated'

interface CachedCursorMessage {
  cursor: null | string
  group_id: string
  has_more: boolean
}
interface CachedMessage extends MessageRead {}

const db = new Dexie('DB') as Dexie & {
  cursors: EntityTable<CachedCursorMessage, 'group_id'>
  messages: EntityTable<CachedMessage, 'id'>
}

// Schema declaration:
db.version(1).stores({
  cachedMessages: 'group_id, cursor',
  messages: 'id, created_at, to_group_id',
})

export { db }
export type { CachedCursorMessage, CachedMessage }

