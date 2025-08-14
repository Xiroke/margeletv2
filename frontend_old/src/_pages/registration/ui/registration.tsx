import { HTMLAttributes } from "react";

import styles from "./registration.module.scss";
import RegistrationForm from "@/features/registration/ui";
import FormPage from "@/shared/ui/form_page";

export const Registration = () => {
  return (
    <FormPage title="Регистрация" isBackButton={false}>
      <RegistrationForm />
    </FormPage>
  );
};

export default Registration;
