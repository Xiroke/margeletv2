import type { FC } from 'react'

import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from '@tanstack/react-router'
import { GroupIcon, PencilLineIcon, ScanSearchIcon } from 'lucide-react'

import type { GroupCategory } from '@/entities/Group/model/types'

import { autoGroupQueryProps } from '@/entities/AutoGroup/api'
import { GroupChatCard } from '@/entities/Group'
import { groupChatTest } from '@/entities/Group/model/test'
import { GroupChatCardSkeleton } from '@/entities/Group/ui/GroupChatCard/GroupChatCard'
import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/shared/ui/empty'

interface ChatGroupListProps {
  className?: string
  groupType: GroupCategory
}

const EmptySimpleGroupList = () => (
  <Empty className="h-full">
    <EmptyHeader>
      <EmptyMedia variant="icon">
        <GroupIcon />
      </EmptyMedia>
      <EmptyTitle>No Groups</EmptyTitle>
      <EmptyDescription>
        You can search for them or create a new one
      </EmptyDescription>
    </EmptyHeader>
    <EmptyContent>
      <Button navigateOptions={{ to: '/groups/createSimple' }} size="sm" variant="outline">
        <PencilLineIcon />
        Create Group
      </Button>
    </EmptyContent>
  </Empty>
)

const EmptyPersonallGroupList = () => (
  <Empty className="h-full">
    <EmptyHeader>
      <EmptyMedia variant="icon">
        <GroupIcon />
      </EmptyMedia>
      <EmptyTitle>No Friends</EmptyTitle>
      <EmptyDescription>
        You can search for them
      </EmptyDescription>
    </EmptyHeader>
    <EmptyContent>
      <Button onClick={() => {}} size="sm">
        <ScanSearchIcon />
        Find Friend
      </Button>
    </EmptyContent>
  </Empty>
)

export const ChatGroupList: FC<ChatGroupListProps> = (
  props: ChatGroupListProps,
) => {
  const { className, groupType } = props
  const { data, isLoading } = useQuery(autoGroupQueryProps.getMyGroupsWithLastMessage({ query: { group_type: groupType } }))
  const groups = data?.groups
  const { groupId } = useParams({ from: '/group/$groupType/{-$groupId}' })

  return (
    <div className={cn(className, 'flex flex-col gap-4')}>
      {isLoading && new Array(4).map((_, idx) => <GroupChatCardSkeleton key={idx} />)}
      {!isLoading && (groups && groups?.length > 0
        ? groups.map((group, idx) => (
            <Link
              key={group.id}
              params={{ groupId: group.id }}
              to="."
            >
              <GroupChatCard
                active={groupId === group.id}
                groupChat={{ ...groupChatTest, title: group.title ?? '' }}
                key={idx}
              />
            </Link>
          ))
        : groupType === 'simple_group' ? <EmptySimpleGroupList /> : <EmptyPersonallGroupList />)}
    </div>
  )
}
