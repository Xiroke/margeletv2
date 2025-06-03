"use client";
import { HTMLAttributes, use, useEffect } from "react";

import styles from "./join_group.module.scss";
import { useApiGroup } from "@/entities/group/model";
import { useRouter } from "next/navigation";

export interface JoinGroupProps extends HTMLAttributes<HTMLDivElement> {
  params: Promise<{ token: string }>;
}

// component must be in /[id]
export const JoinGroup = ({ params }: JoinGroupProps) => {
  const { token } = use(params);
  const { mutate } = useApiGroup.joinGroup();
  const router = useRouter();

  useEffect(() => {
    mutate({ requestBody: token });
    router.push("/communication");
  }, []);

  return <div className={styles.join_group}>JoinGroup Component</div>;
};

export default JoinGroup;
