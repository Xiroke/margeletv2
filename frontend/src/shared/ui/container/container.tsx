import { HTMLAttributes } from 'react';
import clsx from 'clsx';

import styles from './container.module.scss';

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {}

export const Container = ({ className, children }: ContainerProps) => {
  return <div className={clsx(styles.container, className)}>{children}</div>;
};

export default Container;
