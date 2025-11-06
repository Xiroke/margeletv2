import type { FC } from 'react'

import { useQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { GroupIcon, PencilLineIcon, ScanSearchIcon } from 'lucide-react'

import { GroupChatCard } from '@/entities/Group'
import { groupChatTest } from '@/entities/Group/model/test'
import { GroupChatCardSkeleton } from '@/entities/Group/ui/GroupChatCard/GroupChatCard'
import { personalGroupQueryProps } from '@/entities/PersonalGroup/api'
import { simpleGroupQueryProps } from '@/entities/SimpleGroup/api'
import { Button } from '@/shared/ui/button'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/shared/ui/empty'

const groupQueryProps = {
  personal: personalGroupQueryProps.getMyPersonalGroups,
  simple: simpleGroupQueryProps.getMySimpleGroups,
}

interface ChatGroupListProps {
  className?: string
  groupType: 'personal' | 'simple'
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
      <Button navigateOptions={{ to: '/groups/search' }} size="sm">
        <ScanSearchIcon />
        Find Group
      </Button>
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
      <Button navigateOptions={{ to: '/groups/search' }} size="sm">
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
  const { data: groups, isLoading } = useQuery(groupQueryProps[groupType]())
  return (
    <div className={className}>
      {isLoading && new Array(4).map((_, idx) => <GroupChatCardSkeleton key={idx} />)}
      {!isLoading && (groups && groups?.length > 0
        ? groups.map((group, idx) => (
            <Link
              key={group.id}
              params={{ groupId: group.id }}
              to="."
            >
              <GroupChatCard
                groupChat={{ ...groupChatTest, title: group.title }}
                key={idx}
              />
            </Link>
          ))
        : groupType === 'simple' ? <EmptySimpleGroupList /> : <EmptyPersonallGroupList />)}
    </div>
  )
}
