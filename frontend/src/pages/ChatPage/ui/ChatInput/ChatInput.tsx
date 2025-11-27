import type { FC, TextareaHTMLAttributes } from 'react'

import { cva } from 'class-variance-authority'
import { FilesIcon, SendIcon } from 'lucide-react'
import { memo, useRef, useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'

import { cn } from '@/shared/lib/utils'
import { Input } from '@/shared/ui/input'
import { InputGroup, InputGroupAddon, InputGroupTextarea } from '@/shared/ui/input-group'

import { FilePreviewDialog } from '../Dialogs/FilePreviewDialog'

const inputGroupVariants = cva('relative', {
  variants: {
    isPhone: {
      false: '',
      true: 'w-full border-l-0 border-b-0 border-r-0 border-t rounded-none absolute bottom-0',
    },
  },
})

interface ChatInputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  onSend?: (value: string) => void
}

export const ChatInput: FC<ChatInputProps> = memo(({ className, onSend, ...rest }) => {
  const isPhone = useMediaQuery('(max-width: 576px)')
  const [value, setValue] = useState('')
  const [files, setFiles] = useState<File[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const send = () => {
    if (!value.trim()) return
    onSend?.(value)
    setValue('')
  }

  const openFileDialog = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return
    setFiles(Array.from(e.target.files))
    setDialogOpen(true)
    e.target.value = '' // reset
  }

  return (
    <>
      <InputGroup className={cn(inputGroupVariants({ isPhone }), className)}>
        <InputGroupAddon align="inline-start" className="cursor-pointer">
          <div className="relative cursor-pointer">
            <FilesIcon className="size-5" />
            <Input
              className="absolute inset-0 opacity-0 cursor-pointer"
              multiple
              onChange={openFileDialog}
              ref={fileInputRef}
              type="file"
            />
          </div>
        </InputGroupAddon>

        <InputGroupTextarea
          {...rest}
          className={cn('min-h-12 py-3 text-base!', isPhone && 'w-0 flex-1')}
          onChange={e => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              send()
            }
          }}
          placeholder="Enter the message"
          value={value}
        />

        <InputGroupAddon align="inline-end" className="cursor-pointer" onClick={send}>
          {value.trim() && <SendIcon className="size-5" />}
        </InputGroupAddon>
      </InputGroup>

      <FilePreviewDialog
        files={files}
        onConfirm={() => {
          setDialogOpen(false)
          setFiles([])
        }}
        onOpenChange={setDialogOpen}
        open={dialogOpen}
      />
    </>
  )
})
