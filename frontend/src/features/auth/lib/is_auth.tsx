"use client";
import { useEffect, useState } from "react";
import { apiAuth } from "../../model";
import { useQueryClient } from "@tanstack/react-query";

export const useIsAuth = (isGetAccessToken?: boolean) => {
  //no work
  const { data, isSuccess } = apiAuth.getAccessToken();
  const [result, setResult] = useState<boolean | typeof data>(false);

  useEffect(() => {
    if (isSuccess && data) {
      if (isGetAccessToken) {
        setResult(data);
      } else {
        setResult(true);
      }
    }
  }, [isSuccess, data, isGetAccessToken]);

  return result;
};
