import { HTMLAttributes } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import UserCard from '@/entities/user/ui';
import styles from './navigation.module.scss';

export interface NavigationProps extends HTMLAttributes<HTMLDivElement> {}

export const Navigation = ({}: NavigationProps) => {
  return (
    <div className={styles.navigation}>
      <UserCard />
      <Link href="/communication/create_group">
        <Image
          src="/icons/category-plus.svg"
          width={35}
          height={35}
          alt="add group"
          className={styles.add_group}
        />
      </Link>
    </div>
  );
};

export default Navigation;
