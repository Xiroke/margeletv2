'use client';
import { HTMLAttributes } from 'react';

import styles from './login.module.scss';
import Container from '@/shared/ui/container';
import Form from '@/shared/ui/form';
import { InputTextProps } from '@/shared/ui/inputs/input_text';

export interface LoginProps extends HTMLAttributes<HTMLDivElement> {}

export const Login = ({}: LoginProps) => {
  const inputs: InputTextProps[] = [
    { type: 'text', labelText: 'Email', placeholder: 'example@mail.com', name: 'email' },
    { type: 'password', labelText: 'Пароль', placeholder: '*********', name: 'password' },
  ];
  return (
    <Container className={styles.container}>
      <div className={styles.login}>
        <Form
          title="Вход"
          inputs={inputs}
          onSubmit={() => console.log('submit')}
          textButton="Войти"
        />
      </div>
    </Container>
  );
};

export default Login;
