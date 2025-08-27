import { RegistrationPage } from '@/pages/RegistrationPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/registration')({
  component: RegistrationPage,
});
