import type { MessageRead } from '@/shared/api/generated'
import type { CachedCursorMessage } from '@/shared/db'

import { db } from '@/shared/db'

export const saveCachedMessages = async (
  messages: Array<MessageRead>,
  cursor: CachedCursorMessage,
) => {
  await db.messages.bulkPut(messages)

  await db.cursors.put(cursor)
}

export const getCachedMessages = async (groupId: string) => {
  try {
    const cursorDB = await db.cursors.get(groupId)

    if (!cursorDB) {
      return { cursor: null, has_more: false, messages: [] }
    }

    const messages = await db.messages
      .where('groupId')
      .equals(groupId)
      .sortBy('created_at')

    return {
      cursor: cursorDB.cursor,
      has_more: cursorDB.has_more,
      messages,
    }
  }
  catch (error) {
    console.error('IndexedDB error:', error)
    return { cursor: null, has_more: false, messages: [] }
  }
}

export const saveMessages = async (
  groupId: string,
  messages: Array<MessageRead>,
  cursor: null | string,
  has_more: boolean = true,
) => {
  try {
    // Сохраняем сообщения
    await db.messages.bulkPut(messages.map(msg => ({ ...msg, groupId })))

    // Сохраняем курсор
    await db.cursors.put({
      cursor,
      group_id: groupId,
      has_more,
    })
  }
  catch (error) {
    console.error('Failed to save to IndexedDB:', error)
  }
}
