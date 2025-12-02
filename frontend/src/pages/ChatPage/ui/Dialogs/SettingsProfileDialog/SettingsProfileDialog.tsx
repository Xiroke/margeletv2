import { useQuery } from '@tanstack/react-query'
import { CircleUserIcon, User2Icon } from 'lucide-react'
import { type HTMLAttributes, useState } from 'react'

import type { DialogProps } from '@/shared/types/DialogProps'

import { userQueryProps } from '@/entities/User/api'
import { useLogout } from '@/features/auth/api'
import { cn } from '@/shared/lib/utils'
import { AppAvatar } from '@/shared/ui/AppAvatar'
import { Dialog, DialogContent } from '@/shared/ui/dialog'

import { ChangeNameDialog } from '../ChangeNameDialog'

export const SettingsProfileDialog = ({ isOpen, setOpenChange }: DialogProps) => {
  const [isChangeNameOpen, setIsChangeNameOpen] = useState(false)

  const logout = useLogout()
  const { data: meData } = useQuery(userQueryProps.getMeOpt())

  return meData
    ? (
        <Dialog onOpenChange={setOpenChange} open={isOpen}>
          <ChangeNameDialog isOpen={isChangeNameOpen} name={meData?.name} setOpenChange={setIsChangeNameOpen} />

          <DialogContent className="w-100 sm:max-w-[425px]">
            <div className="w-full h-[140px] bg-yellow-400 relative rounded-2xl">
              <AppAvatar className="absolute -bottom-7 left-1/2 -translate-x-1/2 border-6 border-background" fallback={meData?.account_name} size={80} />
            </div>
            <div className="flex flex-col mt-6 gap-2">
              <SettingsSetRow icon={<CircleUserIcon />} label="Name" onClick={() => setIsChangeNameOpen(true)} value={meData?.name} />
              <SettingsSetRow icon={<User2Icon />} label="Account Name" value={'@' + meData?.account_name} />
              <SettingsRow className="bg-destructive hover:bg-destructive/80 justify-center text-background font-bold" onClick={logout}>Log out</SettingsRow>
            </div>
          </DialogContent>
        </Dialog>
      )
    : <>Error</>
}

interface DataSetRowProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  icon: React.ReactNode
  label: string
  value?: null | string
}

const SettingsSetRow = ({ className, icon, label, value, ...props }: DataSetRowProps) => {
  return (
    <SettingsRow {...props} className={cn('justify-between', className)}>
      <div className="text-gray-500 flex gap-3">
        <div>
          {icon}
        </div>
        {label}
      </div>
      <div>{value || '-'}</div>
    </SettingsRow>
  )
}

const SettingsRow = ({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div {...props} className={cn('flex h-10 hover:bg-foreground/5 items-center rounded-md px-2 cursor-pointer', className)}>
      {children}
    </div>
  )
}
