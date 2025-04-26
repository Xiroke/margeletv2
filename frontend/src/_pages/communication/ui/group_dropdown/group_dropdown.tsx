import { HTMLAttributes } from 'react';
import clsx from 'clsx';

import styles from './group_dropdown.module.scss';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

export interface GroupDropdownProps extends HTMLAttributes<HTMLDivElement> {}

export const GroupDropdown = ({ className, children }: GroupDropdownProps) => {
  return (
    <div className={clsx(styles.group_dropdown, className)}>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>{children}</DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content className={styles.menu_content}>
            <DropdownMenu.Item className={styles.menu_item}>Добавить участника</DropdownMenu.Item>
            <DropdownMenu.Item className={styles.menu_item}>Создать чат</DropdownMenu.Item>
            <DropdownMenu.Item className={styles.menu_item}>Выйти из группы</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
};

export default GroupDropdown;
