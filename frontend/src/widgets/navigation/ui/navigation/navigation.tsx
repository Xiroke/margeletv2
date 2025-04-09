import { HTMLAttributes } from 'react';

import styles from './navigation.module.scss';

export interface NavigationProps extends HTMLAttributes<HTMLDivElement> {}

export const Navigation = ({}: NavigationProps) => {
  return <div className={styles.navigation}></div>;
};

export default Navigation;
