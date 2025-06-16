"use client";
import { HTMLAttributes, FormEventHandler } from "react";
import { useRouter } from "next/navigation";
import { useAuthServicePostApiAuthRegister } from "@/shared/api/queries";
import InputText from "@/shared/ui/inputs/input_text";
import Button from "@/shared/ui/button";
import styles from "./registration.module.scss";
import Link from "next/link";
import { useToastStatus } from "@/shared/lib/hooks/use_toast";

export interface RegistrationFormProps
  extends HTMLAttributes<HTMLFormElement> {}

const RegistrationForm = ({}: RegistrationFormProps) => {
  const registerApi = useAuthServicePostApiAuthRegister();
  const router = useRouter();
  const showToast = useToastStatus();

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    registerApi.mutate({
      requestBody: {
        name: formData.get("name") as string,
        account_name: formData.get("account_name") as string,
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      },
    });
    showToast(
      "success",
      "Верификация",
      "Вам на почту отправлена инструкция для верификации"
    );
  };

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <InputText
        type="text"
        name="name"
        labelText="Имя пользователя"
        placeholder="Ivan"
        classNameInput={styles.registration_input}
      />
      <InputText
        type="text"
        name="account_name"
        labelText="Уникальное имя профиля"
        placeholder="example"
        classNameInput={styles.registration_input}
        autoComplete="off"
      />
      <InputText
        type="text"
        name="email"
        labelText="Email"
        placeholder="example@mail.com"
        classNameInput={styles.registration_input}
      />
      <InputText
        type="password"
        name="password"
        labelText="Пароль"
        placeholder="*********"
        classNameInput={styles.registration_input}
      />
      <Button type="submit" className={styles.submit} size="full">
        Зарегистрироваться
      </Button>
      <Link href="/">
        <Button styleType="invert" size="full">
          Войти
        </Button>
      </Link>
    </form>
  );
};

export default RegistrationForm;
