import { Link, useNavigate } from "@tanstack/react-router";
import { clsx } from "clsx";
import type { FC, FormEvent } from "react";
import { useState } from "react";
import cls from "./RegistrationPage.module.scss";

import { Button } from "@/shared/ui/Button/Button";
import { Input } from "@/shared/ui/Input/Input";
import type { CreateUserSchema } from "@/shared/api/generated";
import { useMutation } from "@tanstack/react-query";
import { authQueryProps } from "@/features/auth/api";

interface RegistrationPageProps {
  className?: string;
}

/** Докстринг */
export const RegistrationPage: FC<RegistrationPageProps> = (
  props: RegistrationPageProps
) => {
  const { className } = props;
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({
    name: "",
    account_name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const registration = useMutation({ ...authQueryProps.registerMut() });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    let data = Object.fromEntries(formData.entries());

    if (data.password != data.password_confirmation) {
      setFormErrors((prev) => ({
        ...prev,
        password_confirmation: "Пароли не совпадают",
      }));
      return;
    }

    data = data as CreateUserSchema;

    registration.mutate({ body: data });
    navigate({ to: "/verify" });
  };

  return (
    <form onSubmit={handleSubmit} className={clsx(cls.form, className)}>
      <h1 className={cls.title}>Регистрация</h1>
      <h5 className={cls.subtitle}>Создайте новый профиль</h5>

      <Input label="Имя" placeholder="user" name="name" isFull required />

      <Input
        label="Уникальное имя аккаунта"
        placeholder="user123"
        name="account_name"
        isFull
        required
      />

      <Input
        name="email"
        label="Email"
        placeholder="example@email.com"
        isFull
        required
      />

      <Input
        type="password"
        name="password"
        label="Пароль"
        placeholder="********"
        isFull
        required
      />

      <Input
        type="password"
        name="password_confirmation"
        label="Повторный пароль"
        placeholder="********"
        error={formErrors.password_confirmation}
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
