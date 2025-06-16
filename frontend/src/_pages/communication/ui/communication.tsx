"use client";
import { HTMLAttributes, useEffect } from "react";

import styles from "./communication.module.scss";
import Container from "@/shared/ui/container";
import GroupList from "@/_pages/communication/ui/group_list";
import SearchInput from "./search_input";
import Navigation from "@/widgets/navigation/ui";
import CurrentGroup from "./current_group";
import VerticalLine from "@/shared/ui/vertical_line";
import { apiAuth } from "@/features/auth/model";
import { useRouter } from "next/navigation";
import useMediaQuery from "@/shared/lib/hooks/use_media_query";
import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks";
import NavigationMobileLayout from "@/shared/ui/navigation_mobile_layout";
import { IconArrowBackUp, IconBurger } from "@tabler/icons-react";
import { setChatId } from "@/entities/chat/model/slice";
import { setGroupData } from "@/entities/group/model/slice";
import clsx from "clsx";
import NavigationMobile from "@/widgets/mobile_navigation/ui";

export const Communication = () => {
  const isTablet = useMediaQuery("(min-width: 768px)", {
    initializeWithValue: false,
  });
  const groupId = useAppSelector((state) => state.group.id);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const onChatBack = () => {
    dispatch(setChatId(null));
    dispatch(setGroupData({ id: null, title: null }));
  };

  const chatBack = (
    <IconArrowBackUp className={styles.nav_icon} onClick={onChatBack} />
  );

  return (
    <Container className={styles.container}>
      <NavigationMobile className={styles.nav_mobile}>
        {groupId && chatBack}
      </NavigationMobile>
      <Navigation className={styles.nav} />
      <div className={styles.communication}>
        {((!groupId && !isTablet) || isTablet) && (
          <div className={styles.channels}>
            <SearchInput />
            <GroupList className={styles.groups} />
          </div>
        )}

        {(isTablet || (groupId && !isTablet)) && (
          <>
            {/* vertical line for laptop and more */}
            <VerticalLine className={styles.vertical_line} />
            <CurrentGroup className={styles.current_group} />
          </>
        )}
      </div>
    </Container>
  );
};

export default Communication;
