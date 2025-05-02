"use client";
import { HTMLAttributes, useEffect } from "react";

import styles from "./communication.module.scss";
import Container from "@/shared/ui/container";
import GroupList from "@/widgets/group_list/ui";
import SearchInput from "./search_input";
import Navigation from "@/widgets/navigation/ui";
import CurrentGroup from "./current_group";
import VerticalLine from "@/shared/ui/vertical_line";
import { useRedirectAuth } from "@/features/auth/lib";
import { apiAuth } from "@/features/auth/model";
import { useRouter } from "next/navigation";

export interface CommunicationProps extends HTMLAttributes<HTMLDivElement> {}

export const Communication = ({}: CommunicationProps) => {
  const { data, isLoading } = apiAuth.getAccessToken(undefined, {
    retry: 2,
    retryDelay: 500,
  });
  const router = useRouter();

  useEffect(() => {
    if (!data && !isLoading) {
      router.push("/");
    }
  }, [data, isLoading]);

  return (
    <Container className={styles.container}>
      <Navigation />
      <div className={styles.communication}>
        <div className={styles.channels}>
          <SearchInput />
          <GroupList className={styles.groups} />
        </div>
        <VerticalLine className="vertical_line" />
        <CurrentGroup className={styles.current_group} />
      </div>
    </Container>
  );
};

export default Communication;
