import { memo, useState } from 'react';

import { Button } from '@/shared/ui/Button/Button';
import { Input } from '@/shared/ui/Input/Input';
import { Link } from '@tanstack/react-router';
import { clsx } from 'clsx';
import type { FC } from 'react';
import cls from './LoginPage.module.scss';

interface LoginPageProps {
  className?: string;
}

/** Докстринг */
export const LoginPage: FC<LoginPageProps> = memo((props: LoginPageProps) => {
  const { className } = props;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} className={clsx(cls.form, className)}>
      <h1 className={cls.title}>Вход</h1>
      <h2 className={cls.subtitle}>Зайдите в профиль</h2>

      <Input
        type="email"
        label="Email"
        placeholder="example@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        isFull
        required
      />

      <div className={cls.password}>
        <a>Забыли пароль?</a>
        <Input
          type="password"
          label="Пароль"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
