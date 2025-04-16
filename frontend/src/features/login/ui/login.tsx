'use client';
import { FormEventHandler, HTMLAttributes, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import Form from '@/shared/ui/form';
import { InputTextProps } from '@/shared/ui/inputs/input_text';
import { apiLogin } from '../model';
import { useRedirectAuth, useIsAuth } from '@/features/auth/lib';
import styles from './login.module.scss';

export interface LoginFormProps extends HTMLAttributes<HTMLDivElement> {}

export const LoginForm = ({}: LoginFormProps) => {
  const loginApi = apiLogin.login();
  const router = useRouter();
  // const isAuth = useIsAuth();

  // useEffect(() => {
  //   if (isAuth) {
  //     router.push('/communication');
  //   }
  // }, [isAuth]);

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    loginApi.mutate({ formData: { username: 'user@example.com', password: 'string' } });

    if (!loginApi.data) return;

    router.push('/communication');
  };

  const inputs: InputTextProps[] = [
    { type: 'text', labelText: 'Email', placeholder: 'example@mail.com', name: 'email' },
    { type: 'password', labelText: 'Пароль', placeholder: '*********', name: 'password' },
  ];

  return <Form title="Вход" inputs={inputs} onSubmit={onSubmit} textButton="Войти" />;
};

export default LoginForm;
