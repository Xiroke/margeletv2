import type { Dispatch, FC, SetStateAction } from 'react'

import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { clsx } from 'clsx'
import { memo, useEffect, useState } from 'react'

import type { MessageRead, WsEventRead } from '@/shared/api/generated'

import { userQueryProps } from '@/entities/User/api'
import { useChatScroll } from '@/pages/ChatPage/hooks/useChatScroll'
import { ChatMessagesLoader } from '@/pages/ChatPage/ui/ChatMessagesLoader/ChatMessagesLoader'

import { messageQueryProps } from '../../api'
import { GroupMessage } from '../GroupMessage/GroupMessage'
import cls from './MessageList.module.scss'

interface MessageListProps {
  className?: string
  groupId: string
  initOnMessage?: Dispatch<SetStateAction<(d: WsEventRead) => void>>
}

export const MessageList: FC<MessageListProps> = memo(({ className, groupId, initOnMessage }) => {
  const queryClient = useQueryClient()

  const [knownUsers, setKnownUsers] = useState<Record<string, string>>({})

  const { containerRef, onTopIntersect, scrollToBottom } = useChatScroll()

  const queryConfig = messageQueryProps.getCursorMessagesInf({
    path: { group_id: groupId },
  })

  const { data: pagesData, fetchNextPage } = useInfiniteQuery({
    ...queryConfig,
    enabled: !!groupId,
    getNextPageParam: last => last.cursor,
  })

  useEffect(() => {
    if (containerRef.current) scrollToBottom()
  }, [containerRef, scrollToBottom])

  useEffect(() => {
    if (!initOnMessage) return

    const handleWsMessage = (event: WsEventRead) => {
      if (event.category !== 'message') return

      const newMessage = event.data as MessageRead

      queryClient.setQueryData(queryConfig.queryKey, (old: any) => {
        if (!old) {
          return {
            pageParams: [],
            pages: [
              { cursor: null, has_more: true, messages: [newMessage] },
            ],
          }
        }

        return {
          ...old,
          pages: old.pages.map((p: any, index: number) =>
            index === 0
              ? { ...p, messages: [newMessage, ...p.messages] }
              : p,
          ),
        }
      })

      scrollToBottom()
    }

    initOnMessage(() => handleWsMessage)
  }, [initOnMessage, queryClient, queryConfig.queryKey, scrollToBottom])

  const { mutateAsync: fetchUsernames } = useMutation({
    ...userQueryProps.getUsernamesByIdMut(),
  })

  useEffect(() => {
    if (!pagesData) return

    const missing = new Set<string>()

    for (const page of pagesData.pages) {
      for (const msg of page.messages) {
        if (msg.user_id && !knownUsers[msg.user_id]) {
          missing.add(msg.user_id)
        }
      }
    }

    if (missing.size === 0) return

    const load = async () => {
      const result = await fetchUsernames({ body: Array.from(missing) })
      setKnownUsers(prev => ({ ...prev, ...result }))
    }

    load()
  }, [pagesData, knownUsers, fetchUsernames])

  const firstPage = pagesData?.pages?.[0]
  const lastPage = pagesData?.pages?.[pagesData.pages.length - 1]

  const isEmpty = firstPage && firstPage.messages.length === 0

  return (
    <div className={clsx(cls.message_list, className)} ref={containerRef}>
      {isEmpty && 'Write your first message'}

      {pagesData?.pages.map(page =>
        page.messages.map(message => (
          <GroupMessage
            author={knownUsers[message.user_id]}
            key={message.id}
            message={message}
          />
        )),
      )}

      {lastPage?.has_more && (
        <ChatMessagesLoader
          className={cls.message_list_loader}
          onIntersect={() => onTopIntersect(fetchNextPage)}
        />
      )}
    </div>
  )
})
