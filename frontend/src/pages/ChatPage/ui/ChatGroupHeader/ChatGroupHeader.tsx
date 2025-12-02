import { useQuery } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { PhoneIcon, Settings2Icon, Undo2Icon, UserPlus } from 'lucide-react'

import type { PersonalGroupRead, SimpleGroupRead } from '@/shared/api/generated'

import { autoGroupQueryProps } from '@/entities/AutoGroup/api'
import { useIsMedium, useIsPhone } from '@/shared/hooks/platformSize'
import { cn } from '@/shared/lib/utils'
import { AppAvatar } from '@/shared/ui/AppAvatar'

import { GroupSettingsDropdown } from '../Dropdowns/GroupSettingsDropdown'

interface ChatGroupHeaderProps {
  className?: string
  groupId: string
}

export const ChatGroupHeader = ({ className, groupId }: ChatGroupHeaderProps) => {
  const isMedium = useIsMedium()
  const isPhone = useIsPhone()

  const navigate = useNavigate()

  const group = useQuery(
    autoGroupQueryProps.get({ path: { group_id: groupId } }),
  ).data as PersonalGroupRead | SimpleGroupRead
  const membersCount = useQuery(
    autoGroupQueryProps.getMembersCount({ path: { group_id: groupId } }),
  ).data

  return group && (
    <div className={cn(className, 'flex justify-between items-center px-4 bg-background border-b h-12 w-full', isPhone && 'pt-safe')}>
      <div className="flex items-center gap-6">
        {isMedium && <Undo2Icon onClick={() => navigate({ to: '..' })} />}
        <div className="flex gap-3 items-center">
          <AppAvatar fallback={group.title!} />
          <div className="">
            <div className="">{group.title}</div>
            <div className="text-gray-500 text-sm">
              {membersCount}
              {' '}
              members
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-6">
        {!isPhone
          ? (
              <>
                <PhoneIcon />
                <UserPlus />
                <GroupSettingsDropdown groupId={group.id}>
                  <Settings2Icon />
                </GroupSettingsDropdown>
              </>
            )
          : (
              <>
                <Settings2Icon />
              </>
            )}
      </div>
    </div>
  )
}
