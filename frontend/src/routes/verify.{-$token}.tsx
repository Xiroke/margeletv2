import { VerifyPage } from "@/pages/VerifyPage/ui/VerifyPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/verify/{-$token}")({
  component: VerifyPage,
});
