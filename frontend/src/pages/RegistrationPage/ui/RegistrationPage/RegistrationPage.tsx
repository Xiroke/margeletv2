import { useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { Link, useNavigate } from '@tanstack/react-router'

import { authQueryProps } from '@/features/auth/api'
import { Button } from '@/shared/ui/button'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/shared/ui/field'
import { Input } from '@/shared/ui/input'

import cls from './RegistrationPage.module.scss'

export const RegistrationPage = () => {
  const navigate = useNavigate()
  const register = useMutation({ ...authQueryProps.registerMut() })

  // UserCreate
  const form = useForm({
    defaultValues: {
      account_name: '',
      email: '',
      name: '',
      password: '',
      password_confirmation: '',
    },

    onSubmit: (data) => {
      register.mutate({ body: data.value })
      navigate({
        params: { email: data.value.email },
        to: '/verify/$email/{-$token}',
      })
    },
  })

  return (
    <form
      className={cls.form}
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
    >
      <div className="text-center">
        <h2>Registration</h2>
        <span className="muted">Create new account</span>
      </div>
      <FieldGroup>
        <form.Field
          children={(field) => {
            const isInvalid
              = field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                <Input
                  aria-invalid={isInvalid}
                  autoComplete="off"
                  id={field.name}
                  name={field.name}
                  onBlur={field.handleBlur}
                  onChange={e => field.handleChange(e.target.value)}
                  placeholder="user"
                  value={field.state.value}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
          name="name"
        />
      </FieldGroup>

      <FieldGroup>
        <form.Field
          children={(field) => {
            const isInvalid
              = field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Уникальное имя аккаунта</FieldLabel>
                <Input
                  aria-invalid={isInvalid}
                  autoComplete="off"
                  id={field.name}
                  name={field.name}
                  onBlur={field.handleBlur}
                  onChange={e => field.handleChange(e.target.value)}
                  placeholder="user123"
                  value={field.state.value}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
          name="account_name"
        />
      </FieldGroup>

      <FieldGroup>
        <form.Field
          children={(field) => {
            const isInvalid
              = field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input
                  aria-invalid={isInvalid}
                  autoComplete="off"
                  id={field.name}
                  name={field.name}
                  onBlur={field.handleBlur}
                  onChange={e => field.handleChange(e.target.value)}
                  placeholder="example@email.com"
                  value={field.state.value}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
          name="email"
        />
      </FieldGroup>

      <FieldGroup>
        <form.Field
          children={(field) => {
            const isInvalid
              = field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Пароль</FieldLabel>
                <Input
                  aria-invalid={isInvalid}
                  autoComplete="off"
                  id={field.name}
                  name={field.name}
                  onBlur={field.handleBlur}
                  onChange={e => field.handleChange(e.target.value)}
                  placeholder="********"
                  type="password"
                  value={field.state.value}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
          name="password"
        />
      </FieldGroup>

      <FieldGroup>
        <form.Field
          children={(field) => {
            const isInvalid
              = field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Повторный пароль</FieldLabel>
                <Input
                  aria-invalid={isInvalid}
                  autoComplete="off"
                  id={field.name}
                  name={field.name}
                  onBlur={field.handleBlur}
                  onChange={e => field.handleChange(e.target.value)}
                  placeholder="********"
                  type="password"
                  value={field.state.value}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
          name="password_confirmation"
        />
      </FieldGroup>

      <div className={cls.actions}>
        <Button full type="submit" variant="default">
          Зарегистрироваться
        </Button>
      </div>

      <div className={cls.footer}>
        <span> или </span>
        <Link to="/">Войти</Link>
      </div>
    </form>
  )
}
