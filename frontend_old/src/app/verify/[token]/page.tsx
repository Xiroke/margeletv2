"use client";
import { apiAuth } from "@/features/auth/model";
import { useToastStatus } from "@/shared/lib/hooks/use_toast";
import { useRouter } from "next/navigation";
import { use, useEffect } from "react";

const VerifyAccount = ({ params }: { params: Promise<{ token: string }> }) => {
  const { token } = use(params);
  const { mutateAsync } = apiAuth.verify();
  const router = useRouter();
  const showToast = useToastStatus();

  useEffect(() => {
    mutateAsync({ requestBody: { token } }).then(() => {
      router.push("/");
      showToast("success", "Успех", "Аккаунт успешно верифицирован");
    });
  }, []);

  return <h1>Верификация</h1>;
};

export default VerifyAccount;
