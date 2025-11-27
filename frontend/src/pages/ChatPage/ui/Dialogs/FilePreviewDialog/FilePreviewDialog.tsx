import { XIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { Button } from '@/shared/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/ui/dialog'

interface FilePreviewDialogProps {
  files: File[]
  onConfirm: (files: File[]) => void
  onOpenChange: (open: boolean) => void
  open: boolean
}

export const FilePreviewDialog = ({
  files,
  onConfirm,
  onOpenChange,
  open,
}: FilePreviewDialogProps) => {
  const [selected, setSelected] = useState<File[]>(files)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) setSelected(files)
  }, [files, open])

  const addFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files
    if (!f?.length) return
    setSelected(prev => [...prev, ...Array.from(f)])
    e.target.value = ''
  }

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Attach Files</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <div className="max-h-60 overflow-y-auto">
            {selected.length === 0
              ? (
                  <p className="text-center text-muted-foreground py-4">No files selected</p>
                )
              : (
                  <ul className="space-y-2">
                    {selected.map((file, i) => (
                      <li
                        className="flex items-center justify-between p-2 border rounded-md bg-muted/30"
                        key={`${file.name}-${i}`}
                      >
                        <span className="truncate text-sm">{file.name}</span>
                        <Button
                          className="h-7 w-7 p-0"
                          onClick={() => setSelected(prev => prev.filter(f => f !== file))}
                          size="sm"
                          variant="ghost"
                        >
                          <XIcon className="h-4 w-4" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                )}
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              className="flex-1"
              onClick={() => inputRef.current?.click()}
              size="sm"
              variant="outline"
            >
              Add More
            </Button>

            <Button
              className="flex-1"
              disabled={!selected.length}
              onClick={() => onConfirm(selected)}
              size="sm"
            >
              Attach (
              {selected.length}
              )
            </Button>
          </div>
        </div>

        <input
          className="hidden"
          multiple
          onChange={addFiles}
          ref={inputRef}
          type="file"
        />
      </DialogContent>
    </Dialog>
  )
}
