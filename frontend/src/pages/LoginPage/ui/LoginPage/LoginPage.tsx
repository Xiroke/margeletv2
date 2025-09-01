import { memo } from 'react';

import { authQueryProps } from '@/features/auth/api';
import type { LoginUserSchema } from '@/shared/api/generated';
import { Button } from '@/shared/ui/Button/Button';
import { Input } from '@/shared/ui/Input/Input';
import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate } from '@tanstack/react-router';
import { clsx } from 'clsx';
import type { FC, FormEvent } from 'react';
import cls from './LoginPage.module.scss';

interface LoginPageProps {
  className?: string;
}

/** Докстринг */
export const LoginPage: FC<LoginPageProps> = memo((props: LoginPageProps) => {
  const { className } = props;
  const navigate = useNavigate();
  const login = useMutation({ ...authQueryProps.loginMut() });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;

    const formData = new FormData(form);

    const data = Object.fromEntries(formData.entries()) as LoginUserSchema;

    login.mutate({ body: data });
    navigate({ to: '/chat' });
  };

  return (
    <form onSubmit={handleSubmit} className={clsx(cls.form, className)}>
      <h1 className={cls.title}>Вход</h1>
      <h2 className={cls.subtitle}>Зайдите в профиль</h2>

      <Input
        name="email"
        type="email"
        label="Email"
        placeholder="example@email.com"
        isFull
        required
      />

      <div className={cls.password}>
        <a>Забыли пароль?</a>
        <Input
          name="password"
          type="password"
          label="Пароль"
          placeholder="********"
          isFull
          required
        />
      </div>

      <div className={cls.actions}>
        <Button type="submit" size="md" styleType="default" isFull>
          Войти
        </Button>
      </div>

      <div className={cls.footer}>
        <span> или </span>
        <Link to="/registration">Зарегистрироваться</Link>
      </div>
    </form>
  );
});
