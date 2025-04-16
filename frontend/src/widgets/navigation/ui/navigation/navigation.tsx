import { HTMLAttributes } from 'react';

import UserCard from '@/entities/user/ui';
import styles from './navigation.module.scss';

export interface NavigationProps extends HTMLAttributes<HTMLDivElement> {}

export const Navigation = ({}: NavigationProps) => {
  return (
    <div className={styles.navigation}>
      <UserCard />
    </div>
  );
};

export default Navigation;
