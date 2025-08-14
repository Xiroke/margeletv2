"use client";
import { useRouter, usePathname } from "next/navigation";

import { useIsAuth } from "./is_auth";
import { useEffect } from "react";

export const useRedirectAuth = () => {
  // use for redirect to login if not auth and to communication if auth
  const pathname = usePathname();
  const isAuth = useIsAuth();
  const router = useRouter();

  useEffect(() => {
    console.log("pathname", isAuth);
    if (!isAuth && pathname !== "/") {
      router.push("/");
    }
  }, []);
};
