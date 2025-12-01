import type { Dispatch, SetStateAction } from 'react'

import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { clsx } from 'clsx'
import { memo, useEffect, useState } from 'react'

import type { MessageRead, WsBaseEvent } from '@/shared/api/generated'

import { userQueryProps } from '@/entities/User/api'
import { useChatScroll } from '@/pages/ChatPage/hooks/useChatScroll'
import { ChatMessagesLoader } from '@/pages/ChatPage/ui/ChatMessagesLoader/ChatMessagesLoader'

import { messageQueryProps } from '../../api'
import { GroupMessage } from '../GroupMessage/GroupMessage'
import cls from './MessageList.module.scss'

interface MessageListProps {
  className?: string
  groupId: string
  initOnMessage?: Dispatch<SetStateAction<(d: any) => void>>
  onEditMessage: (message: MessageRead) => void
}

const MessageListComponent = ({ className, groupId, initOnMessage, onEditMessage }: MessageListProps) => {
  const queryClient = useQueryClient()
  const [knownUsers, setKnownUsers] = useState<Record<string, string>>({})

  const { containerRef, onTopIntersect, scrollToBottom } = useChatScroll()

  const queryConfig = messageQueryProps.getCursorMessagesInf({
    path: { group_id: groupId },
  })

  const { data: pagesData, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    ...queryConfig,
    enabled: !!groupId,
    getNextPageParam: (last) => last.cursor,
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    if (!initOnMessage) return

    const handleWsMessage = (event: WsBaseEvent) => {
      if (event.category === 'message_create') {
        const newMessage = event.data as MessageRead

        queryClient.setQueryData(queryConfig.queryKey, (old: any) => {
          if (!old) {
            return {
              pageParams: [],
              pages: [{ cursor: null, has_more: true, messages: [newMessage] }],
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
        setTimeout(scrollToBottom, 50)
      } else if (event.category === 'message_update') {
        const updatedMessage = event.data as MessageRead
        queryClient.setQueryData(queryConfig.queryKey, (old: any) => {
          if (!old) return old
          return {
            ...old,
            pages: old.pages.map((p: any) => ({
              ...p,
              messages: p.messages.map((m: any) =>
                m.id === updatedMessage.id ? updatedMessage : m,
              ),
            })),
          }
        })
      }
    }
    initOnMessage(() => handleWsMessage)
  }, [queryClient, queryConfig.queryKey, scrollToBottom, initOnMessage])

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
      setKnownUsers((prev) => ({ ...prev, ...result }))
    }

    load()
  }, [pagesData, knownUsers, fetchUsernames])

  const isEmpty = pagesData?.pages?.[0]?.messages.length === 0

  return (
    <div className={clsx(cls.message_list, className)} ref={containerRef}>
      {isEmpty && <div className="m-auto">Write your first message</div>}

      {pagesData?.pages.map((page) =>
        page.messages.map((message) => (
          <GroupMessage
            author={knownUsers[message.user_id]}
            key={message.id}
            message={message}
            onEdit={() => onEditMessage?.(message)}
          />
        )),
      )}

      {hasNextPage && (
        <ChatMessagesLoader
          className={cls.message_list_loader}
          isLoading={isFetchingNextPage}
          onIntersect={() => onTopIntersect(fetchNextPage)}
        />
      )}
    </div>
  )
}

export const MessageList = memo(MessageListComponent)
