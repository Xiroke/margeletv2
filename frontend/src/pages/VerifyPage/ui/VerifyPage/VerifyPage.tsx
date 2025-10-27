import type { FC, FormEvent } from "react";

import { clsx } from "clsx";
import { memo, useEffect, useRef, useState } from "react";

import cls from "./VerifyPage.module.scss";
import { useNavigate, useParams } from "@tanstack/react-router";
import { authQueryProps } from "@/features/auth/api";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/shared/ui/Button/Button";
import { Input } from "@/shared/ui/Input/Input";

interface VerifyPageProps {
  className?: string;
}

/** Докстринг */
export const VerifyPage: FC<VerifyPageProps> = memo(
  (props: VerifyPageProps) => {
    const { className } = props;
    const navigate = useNavigate();
    const verify = useMutation({ ...authQueryProps.verifyMut() });
    const inputRef = useRef<HTMLInputElement>(null);
    const [isLoading, setIsLoading] = useState(false);

    const { token: tokenParam } = useParams({ from: "/verify/{-$token}" });
    const [token, setToken] = useState<string | undefined>(
      tokenParam ? tokenParam : ""
    );

    const fetchVerify = async () => {
      if (!token) return;

      setIsLoading(false);
      const response = await verify.mutateAsync({ body: token });
      setIsLoading(true);
      console.log(response);
    };

    return (
      <div className={clsx(cls.verifyPage, className)}>
        <h1>Подтвердите аккаунт</h1>
        <div className={cls.actions}>
          <Input
            ref={inputRef}
            label="Токен верификации"
            placeholder="eyJhbGciOiJ..."
            name="token"
            value={token || ""}
            onChange={(e) => setToken(e.target.value)}
            required
            isFull
          />

          <Button
            size="md"
            styleType="default"
            onClick={() => fetchVerify()}
            loading={isLoading}
            isFull
          >
            Подтвердить
          </Button>
        </div>
      </div>
    );
  }
);
