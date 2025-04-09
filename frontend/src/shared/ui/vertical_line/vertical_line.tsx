import { HTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './vertical_line.module.scss';

export interface VerticalLineProps extends HTMLAttributes<HTMLDivElement> {}

export const VerticalLine = ({ className }: VerticalLineProps) => {
  return <div className={clsx(styles.vertical_line, className)} />;
};

export default VerticalLine;
