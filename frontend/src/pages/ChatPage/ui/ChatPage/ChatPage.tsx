import { useQuery } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import { useEffect, useMemo, useState } from 'react'
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

  const ws = useWS()

  const { data: groups } = useQuery(
    autoGroupQueryProps.getMyGroups({ query: { group_type: groupType } }),
  )

  const myGroupIds = useMemo(() => groups?.map(g => g.id) ?? [], [groups])

  useEffect(() => {
    if (ws.isConnected) ws.onMessage(onMessage)
  }, [ws, onMessage])

  // Sending message
  const send = (message: string) => {
    if (editingMessage) {
      sendUpdate(message, editingMessage.id)
      setEditingMessage(null)
    }
    else {
      sendCreate(message)
    }
  }

  const sendCreate = (message: string) => {
    const packet: WsMessageCreate = {
      category: 'message_create',
      data: { message, to_group_id: groupId! },
    }
    ws.send(JSON.stringify(packet))
  }

  const sendUpdate = (message: string, messageId: string) => {
    const packet: WsMessageUpdate = {
      category: 'message_update',
      data: { message },
      id: messageId,
    }
    ws.send(JSON.stringify(packet))
  }

  const chatInputProps
    = groupId && myGroupIds.includes(groupId)
      ? { editingMessage, onCancelEdit: () => setEditingMessage(null), onSend: send }
      : { placeholder: 'Join the group first', readOnly: true }

  return (
    <div className={cls.chat}>
      <SettingsProfileDialog isOpen={profileDialogOpen} setOpenChange={setProfileDialogOpen} />

      {!isPhone && (
        <ChatNavigation
          className="py-10 ml-5"
          settingsProps={{ setIsProfileDialogOpen: setProfileDialogOpen }}
        />
      )}

      {((!groupId && isTablet) || !isTablet) && (
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
