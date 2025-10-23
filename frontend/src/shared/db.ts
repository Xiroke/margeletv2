import Dexie, { type EntityTable } from "dexie";
import type { ReadMessageSchema } from "./api/generated";

interface CachedMessage extends ReadMessageSchema {}
interface CachedCursorMessage {
  group_id: string;
  cursor: string | null;
  has_more: boolean;
}

const db = new Dexie("DB") as Dexie & {
  messages: EntityTable<CachedMessage, "id">;
  cursors: EntityTable<CachedCursorMessage, "group_id">;
};

// Schema declaration:
db.version(1).stores({
  messages: "id, created_at, to_group_id",
  cachedMessages: "group_id, cursor",
});

export type { CachedCursorMessage, CachedMessage };
export { db };
