import { useQuery } from '@tanstack/react-query'
import { CircleUserIcon, User2Icon } from 'lucide-react'
import { memo, useState } from 'react'

import type { DialogProps } from '@/shared/types/DialogProps'

import { userQueryProps } from '@/entities/User/api'
import { cn } from '@/shared/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar'
import { Dialog, DialogContent } from '@/shared/ui/dialog'

import { ChangeNameDialog } from '../ChangeNameDialog'

export const SettingsProfileDialog = memo(
  ({ isOpen, setOpenChange }: DialogProps) => {
    const [isChangeNameOpen, setIsChangeNameOpen] = useState(false)

    const { data: meData } = useQuery(userQueryProps.getMeOpt())

    return meData
      ? (
          <Dialog onOpenChange={setOpenChange} open={isOpen}>
            <ChangeNameDialog isOpen={isChangeNameOpen} name={meData?.name} setOpenChange={setIsChangeNameOpen} />

            <DialogContent className="w-100 sm:max-w-[425px]">
              <div className="w-full h-[140px] bg-yellow-400 relative rounded-2xl">
                <Avatar className="w-20 h-20 absolute -bottom-7 left-1/2 -translate-x-1/2 border-6 border-white">
                  <AvatarImage src="#" />
                  <AvatarFallback>{meData?.account_name.slice(0, 2)}</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex flex-col mt-6 gap-2">
                <SettingsRow icon={<CircleUserIcon />} label="Name" onClick={() => setIsChangeNameOpen(true)} value={meData?.name} />
                <SettingsRow icon={<User2Icon />} label="Account Name" value={'@' + meData?.account_name} />
              </div>
            </DialogContent>
          </Dialog>
        )
      : <>Error</>
  },
)

interface DataRowProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  icon: React.ReactNode
  label: string
  value?: null | string
}

const SettingsRow = ({ className, icon, label, value, ...props }: DataRowProps) => {
  return (
    <div {...props} className={cn('flex justify-between h-10 hover:bg-foreground/5 items-center rounded-md px-2 cursor-pointer', className)}>
      <div className="text-muted-foreground flex gap-3">
        <div>
          {icon}
        </div>
        {label}
      </div>
      <div>{value || '-'}</div>
    </div>
  )
}
