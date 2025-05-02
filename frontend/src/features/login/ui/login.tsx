"use client";
import { FormEventHandler, HTMLAttributes, useEffect } from "react";
import { useRouter } from "next/navigation";

import InputText from "@/shared/ui/inputs/input_text";
import { apiLogin } from "../model";
import styles from "./login.module.scss";
import Button from "@/shared/ui/button";
import Link from "next/link";

export interface LoginFormProps extends HTMLAttributes<HTMLDivElement> {}

export const LoginForm = ({}: LoginFormProps) => {
  const loginApi = apiLogin.login();
  const router = useRouter();

  useEffect(() => {
    if (!loginApi.isSuccess) {
      return;
    }
    //when get response after communiction, we redirect a user
    router.push("/communication");
  }, [loginApi.isSuccess]);

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    loginApi.mutate({
      formData: {
        username: formData.get("email") as string,
        password: formData.get("password") as string,
      },
    });
  };

  return (
    <form onSubmit={onSubmit} className={styles.form}>
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
      <Button type="submit" className={styles.submit}>
        Войти
      </Button>
      <Link href="/registration">
        <Button styleType="invert">Зарегистрироваться</Button>
      </Link>
    </form>
  );
};

export default LoginForm;
