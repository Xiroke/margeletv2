import type { FC } from 'react'

import { useParams } from '@tanstack/react-router'
import { clsx } from 'clsx'
import { SettingsIcon, UserPlus } from 'lucide-react'
import { useEffect, useState } from 'react'

import type { WsEventRead, WsMessageCreate } from '@/shared/api/generated'

import { useWS } from '@/app/providers/WebsocketProvider'
import { MessageList } from '@/entities/Message/ui/MessageList/MessageList'
import { cn } from '@/shared/lib/utils'
import { Separator } from '@/shared/ui/separator'

import { ChatGroupList } from '../ChatGroupList/ChatGroupList'
import { ChatInput } from '../ChatInput/ChatInput'
import { ChatNavigation } from '../ChatNavigation'
import cls from './ChatPage.module.scss'

interface ChatPageProps {
  className?: string
}

export const ChatPage: FC<ChatPageProps> = (props: ChatPageProps) => {
  const { className } = props
  const { groupId, groupType: _groupType } = useParams({ from: '/group/$groupType/{-$groupId}' })
  const ws = useWS()
  const groupType = _groupType as 'personal_group' | 'simple_group'
  const [onMessage, setOnMessage] = useState<(data: WsEventRead) => void>(() => {})

  useEffect(() => {
    if (ws.isConnected) {
      ws.onMessage(onMessage)
    }
  }, [ws, onMessage])

  const handleSend = (value: string) => {
    const ws_data: WsMessageCreate = {
      category: 'message',
      data: { message: value, to_group_id: groupId! },
    }
    ws.send(ws_data)
  }

  return (
    <div className={clsx(cls.chat, className)}>
      <ChatNavigation />
      { (groupType == 'simple_group' || groupType == 'personal_group') && <ChatGroupList className={cls.group_list} groupType={groupType} />}
      <Separator orientation="vertical" />

      <div className="flex flex-col flex-1 justify-end items-end relative">

        {groupId
          ? (
              <>
                <div className="flex justify-end items-center shrink-0 px-[10%] gap-6 sticky bg-background z-10 top-0 h-12 w-full border-border border-b -mt-10">
                  <UserPlus />
                  <SettingsIcon />
                </div>
                <div className={cn(cls.selected_chat, 'overflow-y-hidden')}>
                  <MessageList groupId={groupId} initOnMessage={setOnMessage} />
                  <ChatInput onSend={handleSend} placeholder="Enter message" />
                </div>
              </>
            )
          : (
              <div className={cls.unselected_chat}>Choose group</div>
            )}
      </div>
    </div>
  )
}
