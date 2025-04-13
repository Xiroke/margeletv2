'use client';
import { HTMLAttributes } from 'react';

import styles from './communication.module.scss';
import Container from '@/shared/ui/container';
import GroupList from '@/widgets/group_list/ui';
import SearchInput from './search_input';
import Navigation from '@/widgets/navigation/ui';
import CurrentGroup from './current_group';
import VerticalLine from '@/shared/ui/vertical_line';
import { useRedirectAuth } from '@/features/auth/lib';

export interface CommunicationProps extends HTMLAttributes<HTMLDivElement> {}

export const Communication = ({}: CommunicationProps) => {
  useRedirectAuth();
  return (
    <Container className={styles.container}>
      <Navigation />
      <div className={styles.communication}>
        <div className="channels">
          <SearchInput />
          <GroupList className={styles.groups} ids={['0929c1d5-a792-499b-ad98-2b1267641dc9']} />
        </div>
        <VerticalLine className="vertical_line" />
        <CurrentGroup className={styles.current_group} />
      </div>
    </Container>
  );
};

export default Communication;
