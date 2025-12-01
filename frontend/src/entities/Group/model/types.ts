export interface Group {
  avatarUrl?: string
  title: string
}

export type GroupCategory = 'personal_group' | 'simple_group'

export interface GroupChat extends Group {
  lastMessage: string
  time: string
  unreadCount?: number
}
