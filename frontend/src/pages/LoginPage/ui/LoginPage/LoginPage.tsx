import type { FC } from 'react';

import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate } from '@tanstack/react-router';
import { clsx } from 'clsx';
import { ResultAsync } from 'neverthrow';
import { toast } from 'sonner';

import { authQueryProps } from '@/features/auth/api';
import { Button } from '@/shared/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';

import cls from './LoginPage.module.scss';

interface LoginPageProps {
  className?: string;
}

export const LoginPage: FC<LoginPageProps> = (props: LoginPageProps) => {
  const { className } = props;
  const navigate = useNavigate();
  const login = useMutation({ ...authQueryProps.loginMut() });

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },

    onSubmit: async (data) => {
      const result = await ResultAsync.fromPromise(
        login.mutateAsync({ body: data.value }),
        error => error as {detail: string}
      )

      if (result.isErr()) {
        toast.error(result.error.detail);
        return
      }

      navigate({
        params: { groupType: 'simple' },
        to: '/group/$groupType/{-$groupId}',
      });
    },
  });

  return (
    <form className={clsx(cls.form, className)}
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}>

      <div className='text-center'>
        <h2 >Login</h2>
        <span className='muted'>Enter your email and password</span>
      </div>

      <FieldGroup>
        <form.Field
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input
                  aria-invalid={isInvalid}
                  autoComplete="off"
                  full
                  id={field.name}
                  name={field.name}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="example@email.com"
                  type="email"
                  value={field.state.value}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
          name="email"
        />
      </FieldGroup>

      <div className={cls.password}>
        <a>Forgot password?</a>
        <FieldGroup>
          <form.Field
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <Input
                    aria-invalid={isInvalid}
                    autoComplete="off"
                    full
                    id={field.name}
                    name={field.name}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
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
      </div>

      <div className={cls.actions}>
        <Button full type="submit" variant="default">
          Login
        </Button>
      </div>

      <div className={cls.footer}>
        <span> Or </span>
        <Link to="/registration">Register</Link>
      </div>
    </form>
  );
};
