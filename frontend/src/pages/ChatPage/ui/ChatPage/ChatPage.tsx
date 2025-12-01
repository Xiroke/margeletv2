import { useQuery } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import { type HTMLAttributes, useCallback, useEffect, useMemo, useState } from 'react'

import type { GroupCategory } from '@/entities/Group/model/types'
import type { MessageRead, WsBaseEvent, WsMessageCreate, WsMessageUpdate } from '@/shared/api/generated'

import { useWS } from '@/app/providers/WebsocketProvider'
import { autoGroupQueryProps } from '@/entities/AutoGroup/api'
import { MessageList } from '@/entities/Message/ui/MessageList/MessageList'
import { useIsMedium, useIsPhone } from '@/shared/hooks/platformSize'
import { cn } from '@/shared/lib/utils'
import { Separator } from '@/shared/ui/separator'

import { ChatGroupHeader } from '../ChatGroupHeader'
import { ChatGroupList } from '../ChatGroupList/ChatGroupList'
import { ChatInput } from '../ChatInput/ChatInput'
import { ChatNavigation } from '../ChatNavigation'
import { MobileFooterChatNavigation, MobileHeaderNavigationContainer, MobileHeaderNavigationDefault } from '../ChatNavigation/ChatNavigation'
import { SettingsProfileDialog } from '../Dialogs/SettingsProfileDialog'
import cls from './ChatPage.module.scss'

export const ChatPage = () => {
  const isMedium = useIsMedium()
  const isPhone = useIsPhone()
  const [profileDialogOpen, setProfileDialogOpen] = useState(false)

  const params = useParams({ from: '/group/$groupType/{-$groupId}' })
  const groupId = params.groupId
  const groupType = params.groupType as GroupCategory

  const showSidebar = (!groupId && isMedium) || !isMedium

  return (
    <div className="flex flex-col h-[100dvh] overflow-hidden bg-background pt-safe pb-safe">
      <SettingsProfileDialog isOpen={profileDialogOpen} setOpenChange={setProfileDialogOpen} />

      {isPhone
        ? (
            <>
              <MobileHeaderNavigationContainer>
                {showSidebar ? <MobileHeaderNavigationDefault /> : (groupId && <ChatGroupHeader groupId={groupId} />)}
              </MobileHeaderNavigationContainer>

              <div className="flex-1 overflow-hidden flex flex-col min-h-0">
                {showSidebar
                  ? (
                      <>
                        <ChatGroupList
                          className={cn(cls.group_list, 'flex-1 overflow-y-auto p-5')}
                          groupType={groupType}
                        />
                        <MobileFooterChatNavigation setIsProfileDialogOpen={setProfileDialogOpen} />
                      </>
                    )
                  : (
                      groupId && <CurrentGroup className="flex-1" groupId={groupId} groupType={groupType} />
                    )}
              </div>
            </>
          )
        : (
            <div className="flex flex-1 overflow-hidden">
              {showSidebar && (
                <>
                  <ChatNavigation className="py-10 ml-5" setIsProfileDialogOpen={setProfileDialogOpen} />
                  <ChatGroupList
                    className={cn(cls.group_list, 'py-10 px-5 w-[360px] overflow-y-auto')}
                    groupType={groupType}
                  />
                  <Separator orientation="vertical" />
                </>
              )}

              <div className="flex flex-col flex-1 min-w-0 bg-background/50">
                {groupId
                  ? (
                      <CurrentGroup className="flex-1" groupId={groupId} groupType={groupType} />
                    )
                  : (
                      <div className={cls.unselected_chat}>Choose group</div>
                    )}
              </div>
            </div>
          )}
    </div>
  )
}

interface CurrentGroupProps extends HTMLAttributes<HTMLDivElement> {
  groupId: string
  groupType: GroupCategory
}

export const CurrentGroup = ({ className, groupId, groupType }: CurrentGroupProps) => {
  const isPhone = useIsPhone()

  const [onMessage, setOnMessage] = useState<(d: WsBaseEvent) => void>(() => {})
  const [editingMessage, setEditingMessage] = useState<MessageRead | null>(null)

  const ws = useWS()

  useEffect(() => {
    if (ws.isConnected) ws.onMessage(onMessage)
  }, [ws])

  const { data: groups } = useQuery(
    autoGroupQueryProps.getMyGroups({ query: { group_type: groupType } }),
  )

  const isMyGroup = useMemo(() =>
    groups?.some((g) => g.id === groupId) ?? false,
  [groups, groupId])

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

  return (
    <div className={cn('flex flex-col h-full w-full', className)}>
      {!isPhone && <ChatGroupHeader className="shrink-0 border-b" groupId={groupId} />}

      <div className="flex-1 overflow-hidden w-full relative min-h-0 md:w-1/2 mx-auto">
        <MessageList
          className="h-full mx-auto"
          groupId={groupId}
          initOnMessage={setOnMessage}
          onEditMessage={setEditingMessage}
        />
      </div>

      <div className="shrink-0 p-2 bg-background z-10 mx-auto w-full md:w-1/2">
        <ChatInput {...chatInputProps} />
      </div>
    </div>
  )
}
