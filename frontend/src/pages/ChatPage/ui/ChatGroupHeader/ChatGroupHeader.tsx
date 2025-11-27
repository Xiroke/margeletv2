import { PhoneIcon, Settings2Icon, UserPlus } from 'lucide-react'

import { cn } from '@/shared/lib/utils'

import { GroupSettingsDropdown } from '../Dropdowns/GroupSettingsDropdown'

interface ChatGroupHeaderProps {
  className?: string
  groupId: string
}

export const ChatGroupHeader = ({ className, groupId }: ChatGroupHeaderProps) => {
  return (
    <div className={cn(className, 'flex justify-between items-center px-4 bg-background border-b h-12 w-full')}>
      <div className="">
        <div className="">Group name</div>
        <div className="text-muted-foreground text-sm">100200 members</div>
      </div>
      <div className="flex gap-6">
        <PhoneIcon />
        <UserPlus />
        <GroupSettingsDropdown groupId={groupId}>
          <Settings2Icon />
        </GroupSettingsDropdown>
      </div>
    </div>
  )
}
