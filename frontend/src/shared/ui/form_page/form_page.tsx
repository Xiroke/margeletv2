'use client';
import { FormEvent, FormEventHandler, HTMLAttributes, ReactNode } from 'react';

import styles from './form_page.module.scss';
import InputText from '@/shared/ui/inputs/input_text';
import type { InputTextProps } from '@/shared/ui/inputs/input_text';
import Button from '@/shared/ui/button';
import Container from '../container';

export interface FormPageProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
}

export const FormPage = ({ title, children }: FormPageProps) => {
  // use for page being form
  return (
    <Container className={styles.container}>
      <div className={styles.form_layout}>
        <div className={styles.form_block}>
          <div className={styles.title}>{title}</div>
          {children}
        </div>
      </div>
    </Container>
  );
};

export default FormPage;
