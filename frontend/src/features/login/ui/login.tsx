'use client';
import { FormEventHandler, HTMLAttributes } from 'react';
import { useRouter } from 'next/navigation';

import Form from '@/shared/ui/form_page';
import InputText from '@/shared/ui/inputs/input_text';
import { apiLogin } from '../model';
import styles from './login.module.scss';
import Button from '@/shared/ui/button';

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
    router.push('/communication');
  };

  return (
    <form onSubmit={onSubmit} className={styles.login_form}>
      <InputText
        type="text"
        name="email"
        labelText="Email"
        placeholder="example@mail.com"
        classNameInput={styles.login_input}
      />
      <InputText
        type="password"
        name="password"
        labelText="Пароль"
        placeholder="*********"
        classNameInput={styles.login_input}
      />
      <Button type="submit">Войти</Button>
    </form>
  );
};

export default LoginForm;
