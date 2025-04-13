'use client';
import { HTMLAttributes } from 'react';

import styles from './login.module.scss';
import Container from '@/shared/ui/container';
import LoginForm from '@/features/login/ui';

export interface LoginProps extends HTMLAttributes<HTMLDivElement> {}

export const Login = ({}: LoginProps) => {
  return (
    <Container className={styles.container}>
      <div className={styles.login}>
        <LoginForm />
      </div>
    </Container>
  );
};

export default Login;
