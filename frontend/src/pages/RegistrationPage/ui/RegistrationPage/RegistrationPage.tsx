import { Link } from '@tanstack/react-router';
import { clsx } from 'clsx';
import type { FC } from 'react';
import { useState } from 'react';
import cls from './RegistrationPage.module.scss';

import { Button } from '@/shared/ui/Button/Button';
import { Input } from '@/shared/ui/Input/Input';

interface RegistrationPageProps {
  className?: string;
}

/** Докстринг */
export const RegistrationPage: FC<RegistrationPageProps> = (
  props: RegistrationPageProps,
) => {
  const { className } = props;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password });
  };
  return (
    <form onSubmit={handleSubmit} className={clsx(cls.form, className)}>
      <h1 className={cls.title}>Регистрация</h1>
      <h2 className={cls.subtitle}>Создайте новый профиль</h2>

      <Input
        type="name"
        label="Имя"
        placeholder="user"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        isFull
        required
      />

      <Input
        type="account_name"
        label="Уникальное имя аккаунта"
        placeholder="user123"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        isFull
        required
      />

      <Input
        type="email"
        label="Email"
        placeholder="example@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        isFull
        required
      />

      <Input
        type="password"
        label="Пароль"
        placeholder="********"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        isFull
        required
      />

      <Input
        type="password"
        label="Повторный пароль"
        placeholder="********"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        isFull
        required
      />

      <div className={cls.actions}>
        <Button type="submit" size="md" styleType="default" isFull>
          Зарегистрироваться
        </Button>
      </div>

      <div className={cls.footer}>
        <span> или </span>
        <Link to="/">Войти</Link>
      </div>
    </form>
  );
};
