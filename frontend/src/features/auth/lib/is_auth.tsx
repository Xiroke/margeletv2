"use client";
import { useEffect, useState } from "react";
import { apiAuth } from "../model";
import { useQueryClient } from "@tanstack/react-query";
import { useToastStatus } from "@/shared/lib/hooks/use_toast";

export const useIsAuth = () => {
  //no work
  const { mutateAsync } = apiAuth.postAccessToken();
  const [result, setResult] = useState<boolean>(false);

  // const showToast = useToastStatus();

  const getToken = async () => {
    try {
      const data = await mutateAsync();
      setResult(true);
    } catch (error) {
      console.error("Error authorization");
      // showToast("error", "Ошибка", "При попытке аунтификации произошла ошибка");
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  return result;
};
