import type { FC } from 'react'

import { useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { clsx } from 'clsx'
import { ResultAsync } from 'neverthrow'
import { memo } from 'react'
import toast, { Toaster } from 'react-hot-toast'

import type { SimpleGroupCreate } from '@/shared/api/generated'

import { simpleGroupQueryProps } from '@/entities/SimpleGroup/api'
import { BackButton } from '@/shared/ui/BackButton'
import { Button } from '@/shared/ui/button'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/shared/ui/field'
import { Input } from '@/shared/ui/input'

import cls from './CreateSimpleGroupPage.module.scss'

interface CreateSimpleGroupPageProps {
  className?: string
}

export const CreateSimpleGroupPage: FC<CreateSimpleGroupPageProps> = memo(
  (props: CreateSimpleGroupPageProps) => {
    const { className } = props
    const navigate = useNavigate()

    const createGroup = useMutation({ ...simpleGroupQueryProps.create() })

    const form = useForm({
      defaultValues: {
        description: '',
        title: '',
      },

      onSubmit: async (data) => {
        const payload = data.value as SimpleGroupCreate
        const result = await ResultAsync.fromPromise(
          createGroup.mutateAsync({ body: payload }),
          error => error as { detail: string },
        )

        if (result.isErr()) {
          toast.error(result.error.detail || 'Не удалось создать группу')
        }
        else {
          toast.success('Группа успешно создана')
          navigate({ to: '/groups/search' })
        }
      },
    })

    return (
      <form
        className={clsx(cls.form, className)}
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >
        <Toaster position="top-center" />
        <BackButton />

        <div className="text-center mb-2">
          <h3>Create group</h3>
          <span className="muted">Enter group details</span>
        </div>

        <FieldGroup>
          <form.Field
            children={(field) => {
              const isInvalid
                = field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Group name</FieldLabel>
                  <Input
                    aria-invalid={isInvalid}
                    autoComplete="off"
                    full
                    id={field.name}
                    name={field.name}
                    onBlur={field.handleBlur}
                    onChange={e => field.handleChange(e.target.value)}
                    placeholder="Happy group"
                    type="text"
                    value={field.state.value}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
            name="title"
          />
        </FieldGroup>

        <FieldGroup>
          <form.Field
            children={(field) => {
              const isInvalid
                = field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                  <Input
                    aria-invalid={isInvalid}
                    autoComplete="off"
                    full
                    id={field.name}
                    name={field.name}
                    onBlur={field.handleBlur}
                    onChange={e => field.handleChange(e.target.value)}
                    placeholder="Enter short descriptions"
                    type="text"
                    value={field.state.value}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
            name="description"
          />
        </FieldGroup>

        <div className={cls.actions}>
          <Button full size="lg" type="submit" variant="default">
            Create
          </Button>
        </div>
      </form>
    )
  },
)
