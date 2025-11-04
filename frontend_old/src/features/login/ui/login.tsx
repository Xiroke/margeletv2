"use client";
import { FormEventHandler, HTMLAttributes, useEffect } from "react";
import { useRouter } from "next/navigation";

import InputText from "@/shared/ui/inputs/input_text";
import { apiLogin } from "../model";
import styles from "./login.module.scss";
import Button from "@/shared/ui/button";
import Link from "next/link";
import { useToastStatus } from "@/shared/lib/hooks/use_toast";

export interface LoginFormProps extends HTMLAttributes<HTMLDivElement> {}

export const LoginForm = ({}: LoginFormProps) => {
  const loginApi = apiLogin.login();
  const router = useRouter();
  const showToast = useToastStatus();

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
        showToast("error", "Неверный данные", "email или пароль неверный");
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
      <Button type="submit" className={styles.submit} size="full">
        Войти
      </Button>
      <Link href="/registration">
        <Button variant="invert" size="full">
          Зарегистрироваться
        </Button>
      </Link>
    </form>
  );
};

export default LoginForm;
