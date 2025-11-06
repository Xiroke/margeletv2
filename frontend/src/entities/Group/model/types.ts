export interface Group {
  avatarUrl?: string
  title: string
}

export interface GroupChat extends Group {
  lastMessage: string
  time: string
  unreadCount?: number
}
