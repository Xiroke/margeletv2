"use client";
import { HTMLAttributes, use, useEffect } from "react";

import styles from "./join_group.module.scss";
import { apiGroup } from "@/entities/group/model";
import { useRouter } from "next/navigation";
import Button from "@/shared/ui/button";

export interface JoinGroupProps {
  params: Promise<{ token: string }>;
}

// component must be in /[token]
export const JoinGroup = ({ params }: JoinGroupProps) => {
  const { token } = use(params);
  const { mutateAsync } = apiGroup.joinGroup();
  const router = useRouter();
  const join = async () => {
    await mutateAsync({ requestBody: token });
  };

  const redirect = () => {
    router.push("/communication");
  };

  useEffect(() => {
    join();
  }, []);

  return (
    <div className={styles.join_group}>
      <div>Вы присоединились к группе</div>
      <Button onClick={redirect}>Перейти в мессенджер</Button>
    </div>
  );
};

export default JoinGroup;
