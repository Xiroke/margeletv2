import type { ReadMessageSchema } from "@/shared/api/generated";
import { db, type CachedCursorMessage } from "@/shared/db";

export const saveCachedMessages = async (
  messages: ReadMessageSchema[],
  cursor: CachedCursorMessage
) => {
  await db.messages.bulkPut(messages);

  await db.cursors.put(cursor);
};

export const getCachedMessages = async (groupId: string) => {
  try {
    const cursorDB = await db.cursors.get(groupId);

    if (!cursorDB) {
      return { messages: [], cursor: null, has_more: false };
    }

    const messages = await db.messages
      .where("groupId")
      .equals(groupId)
      .sortBy("created_at");

    return {
      messages,
      cursor: cursorDB.cursor,
      has_more: cursorDB.has_more,
    };
  } catch (error) {
    console.error("IndexedDB error:", error);
    return { messages: [], cursor: null, has_more: false };
  }
};

export const saveMessages = async (
  groupId: string,
  messages: ReadMessageSchema[],
  cursor: string | null,
  has_more: boolean = true
) => {
  try {
    // Сохраняем сообщения
    await db.messages.bulkPut(messages.map((msg) => ({ ...msg, groupId })));

    // Сохраняем курсор
    await db.cursors.put({
      group_id: groupId,
      cursor,
      has_more,
    });
  } catch (error) {
    console.error("Failed to save to IndexedDB:", error);
  }
};
