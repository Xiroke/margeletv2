import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'sonner'

import { userQueryProps } from '@/entities/User/api'
import { Button } from '@/shared/ui/button'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle } from '@/shared/ui/dialog'
import { Input } from '@/shared/ui/input'

export const ChangeNameDialog = ({ isOpen, name, setOpenChange }: { isOpen: boolean, name: string, setOpenChange: (open: boolean) => void }) => {
  const changeName = useMutation({ ...userQueryProps.update() })
  const [nameValue, setNameValue] = useState(name)
  const queryClient = useQueryClient()

  const handleSave = () => {
    const fetchChangeName = async () => {
      await changeName.mutateAsync({ body: { name: nameValue } })
      queryClient.invalidateQueries({ queryKey: userQueryProps.getMeKey() })
      toast.success('Name changed')
    }
    fetchChangeName()
  }

  return (
    <Dialog onOpenChange={setOpenChange} open={isOpen}>
      <DialogContent className="w-100 sm:max-w-[425px]">
        <DialogTitle>Change name</DialogTitle>
        <Input onChange={e => setNameValue(e.target.value)} required value={nameValue} />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
