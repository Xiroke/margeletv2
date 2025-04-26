'use client';
import { HTMLAttributes } from 'react';

import styles from './login.module.scss';
import Container from '@/shared/ui/container';
import LoginForm from '@/features/login/ui';
import FormPage from '@/shared/ui/form_page';

export interface LoginProps extends HTMLAttributes<HTMLDivElement> {}

export const Login = ({}: LoginProps) => {
  return (
    <FormPage title="Вход">
      <LoginForm />
    </FormPage>
  );
};

export default Login;
