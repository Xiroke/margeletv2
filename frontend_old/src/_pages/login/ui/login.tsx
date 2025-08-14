"use client";

import LoginForm from "@/features/login/ui";
import FormPage from "@/shared/ui/form_page";

export const Login = () => {
  return (
    <FormPage title="Вход" isBackButton={false}>
      <LoginForm />
    </FormPage>
  );
};

export default Login;
