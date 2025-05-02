import { HTMLAttributes } from "react";

import styles from "./registration.module.scss";
import RegistrationForm from "@/features/registration/ui";
import FormPage from "@/shared/ui/form_page";

export interface RegistrationProps extends HTMLAttributes<HTMLDivElement> {}

export const Registration = ({}: RegistrationProps) => {
  return (
    <FormPage title="Регистрация">
      <RegistrationForm />
    </FormPage>
  );
};

export default Registration;
