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

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    await loginApi
      .mutateAsync({
        formData: {
          username: formData.get("email") as string,
          password: formData.get("password") as string,
        },
      })
      .then((data) => {
        console.log(data);
        router.push("/communication");
      })
      .catch((reason) => {
        console.log(
          reason.status == 400 && alert("Вы ввели неверную почту или пароль")
        );
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
