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
  initOnMessage?: Dispatch<SetStateAction<((data: WsEventRead) => void)>>
}

export const MessageList: FC<MessageListProps> = memo(
  (props: MessageListProps) => {
    const { className, groupId, initOnMessage } = props
    const [knownUsers, setKnownUsers] = useState<Record<string, string>>({})
    const queryClient = useQueryClient()
    const { containerRef: scrollContainerRef, onTopIntersect, scrollToBottom } = useChatScroll()

    const getCursorMessagesQuery = messageQueryProps.getCursorMessagesInf({
      path: { group_id: groupId },
    })

    const { data: infinityDataMessages, fetchNextPage } = useInfiniteQuery({
      ...getCursorMessagesQuery,
      enabled: !!groupId,
      getNextPageParam: lastPage => lastPage.cursor,
    })

    useEffect(() => {
      const messages = scrollContainerRef.current
      if (!messages) return

      scrollToBottom()
    }, [scrollContainerRef, scrollToBottom])

    const { mutateAsync: usernamesMut } = useMutation({
      ...userQueryProps.getUsernamesByIdMut(),
    })
    useEffect(() => {
      if (!initOnMessage) return

      const onMessageCallback = (data: WsEventRead) => {
        if (data.category === 'message') {
          const ws_inner_data = data.data as MessageRead

          queryClient.setQueryData(
            getCursorMessagesQuery.queryKey,
            (oldData: any) => {
              if (!oldData)
                return {
                  pageParams: [],
                  pages: [{ cursor: null, has_more: true, messages: [ws_inner_data] }],
                }

              return {
                ...oldData,
                pages: oldData.pages.map((page, idx) =>
                  idx === 0
                    ? { ...page, messages: [ws_inner_data, ...page.messages] }
                    : page,
                ),
              }
            },
          )
        }

        scrollToBottom()
      }

      initOnMessage(() => (data: WsEventRead) => { onMessageCallback(data); scrollToBottom() })
    }, [initOnMessage, queryClient, getCursorMessagesQuery.queryKey])

    useEffect(() => {
      if (!infinityDataMessages) return

      // collect list of unknown users
      const unknownUsersSet = new Set<string>()

      infinityDataMessages.pages.forEach((page) => {
        page.messages.forEach((message) => {
          if (message.user_id && !knownUsers[message.user_id]) {
            unknownUsersSet.add(message.user_id)
          }
        })
      })

      if (unknownUsersSet.size === 0) return
      // fetch unknown users
      const fetchUsername = async () => {
        const idToUsername = await usernamesMut({
          body: Array.from(unknownUsersSet),
        })

        setKnownUsers(prev => ({
          ...prev,
          ...idToUsername,
        }))
      }

      fetchUsername()
    }, [infinityDataMessages, knownUsers, usernamesMut])

    return (
      <div
        className={clsx(cls.message_list, className)}
        ref={scrollContainerRef}
      >
        {infinityDataMessages
          && infinityDataMessages.pages
          && infinityDataMessages.pages.map((page, idx) =>
            page.messages.map(message => (
              <GroupMessage
                author={knownUsers[message.user_id]}
                key={message.id}
                message={message}
              />
            )),
          )}
        {infinityDataMessages?.pages[infinityDataMessages?.pages.length - 1]
          ?.has_more && (
          <ChatMessagesLoader
            className={cls.message_list_loader}
            onIntersect={() => onTopIntersect(fetchNextPage)}
          />
        )}
      </div>
    )
  },
)
