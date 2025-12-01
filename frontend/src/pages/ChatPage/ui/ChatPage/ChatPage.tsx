import { useQuery } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'

import type { MessageRead, WsEventRead, WsMessageCreate, WsMessageUpdate } from '@/shared/api/generated'

import { useWS } from '@/app/providers/WebsocketProvider'
import { autoGroupQueryProps } from '@/entities/AutoGroup/api'
import { MessageList } from '@/entities/Message/ui/MessageList/MessageList'
import { cn } from '@/shared/lib/utils'
import { Separator } from '@/shared/ui/separator'

import { ChatGroupHeader } from '../ChatGroupHeader'
import { ChatGroupList } from '../ChatGroupList/ChatGroupList'
import { ChatInput } from '../ChatInput/ChatInput'
import { ChatNavigation } from '../ChatNavigation'
import { SettingsProfileDialog } from '../Dialogs/SettingsProfileDialog'
import cls from './ChatPage.module.scss'

export const ChatPage = () => {
  const isTablet = useMediaQuery('(max-width: 1024px)')
  const isMedium = useMediaQuery('(max-width: 768px)')
  const isPhone = useMediaQuery('(max-width: 576px)')

  const [profileDialogOpen, setProfileDialogOpen] = useState(false)
  const [onMessage, setOnMessage] = useState<(d: WsEventRead) => void>(() => {})
  const [editingMessage, setEditingMessage] = useState<MessageRead | null>(null)

  const params = useParams({ from: '/group/$groupType/{-$groupId}' })
  const groupId = params.groupId
  const groupType = params.groupType as 'personal_group' | 'simple_group'

  const showSidebar = (!groupId && isTablet) || !isTablet

  const ws = useWS()

  const { data: groups } = useQuery(
    autoGroupQueryProps.getMyGroups({ query: { group_type: groupType } }),
  )

  const isMyGroup = useMemo(() =>
    groups?.some((g) => g.id === groupId) ?? false,
  [groups, groupId])

  useEffect(() => {
    if (ws.isConnected) ws.onMessage(onMessage)
  }, [ws])

  const handleSend = useCallback((message: string) => {
    if (!groupId) return

    const payload = editingMessage
      ? JSON.stringify({
          category: 'message_update',
          data: { message },
          id: editingMessage.id,
        } as WsMessageUpdate)
      : JSON.stringify({
          category: 'message_create',
          data: { message, to_group_id: groupId },
        } as WsMessageCreate)

    ws.send(payload)

    if (editingMessage) {
      setEditingMessage(null)
    }
  }, [ws, groupId, editingMessage])

  const chatInputProps = useMemo(() => {
    if (!groupId || !isMyGroup) {
      return { placeholder: 'Join the group first', readOnly: true }
    }
    return {
      editingMessage,
      onCancelEdit: () => setEditingMessage(null),
      onSend: handleSend,
    }
  }, [groupId, isMyGroup, editingMessage, handleSend])

  const settingsProps = useMemo(() => ({
    setIsProfileDialogOpen: setProfileDialogOpen,
  }), [])

  return (
    <div className={cls.chat}>
      <SettingsProfileDialog isOpen={profileDialogOpen} setOpenChange={setProfileDialogOpen} />

      {!isPhone && (
        <ChatNavigation
          className="py-10 ml-5"
          settingsProps={settingsProps}
        />
      )}

      {showSidebar && (
        <>
          <ChatGroupList
            className={cn(cls.group_list, 'py-10 px-5 min-w-[300px] md:w-1/4 w-full md:max-w-[360px] max-w-none')}
            groupType={groupType}
          />
          {!isPhone && <Separator orientation="vertical" />}
        </>
      )}

      {(!isMedium || (isMedium && groupId)) && (
        <div className="flex flex-col flex-1 justify-end items-end relative">
          {groupId
            ? (
                <>
                  <ChatGroupHeader
                    className="top-0 z-10 shrink-0 sticky"
                    groupId={groupId}
                  />

                  <div className={cn(cls.selected_chat, 'overflow-y-hidden w-1/2 min-w-[450px] p-1')}>
                    <MessageList groupId={groupId} initOnMessage={setOnMessage} onEditMessage={setEditingMessage} />
                    <ChatInput {...chatInputProps} className={cn(!isPhone && 'mb-5')} />
                  </div>
                </>
              )
            : (
                <div className={cls.unselected_chat}>Choose group</div>
              )}
        </div>
      )}
    </div>
  )
}
