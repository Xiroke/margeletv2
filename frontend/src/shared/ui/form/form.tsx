'use client';
import { FormEvent, FormEventHandler, HTMLAttributes, ReactNode } from 'react';

import styles from './form.module.scss';
import InputText from '@/shared/ui/inputs/input_text';
import type { InputTextProps } from '@/shared/ui/inputs/input_text';
import Button from '@/shared/ui/button';

export interface FormProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  inputs: InputTextProps[];
  textButton: string;
  afterInputsElement?: ReactNode;
  afterFormElement?: ReactNode;
  onSubmit: FormEventHandler;
}

export const Form = ({
  title,
  inputs,
  textButton,
  afterInputsElement,
  afterFormElement,
  onSubmit,
}: FormProps) => {
  return (
    <div className={styles['form-block']}>
      <div className={styles['title']}>{title}</div>
      <form className={styles['form']} onSubmit={onSubmit}>
        {inputs.map((inputItem, index) => (
          <InputText type={inputItem.type} key={index} {...inputItem} />
        ))}
        {/* This is HTML Element */}
        {afterInputsElement}
        <Button type="submit">{textButton}</Button>
        {/* This is HTML Element */}
        {afterFormElement}
      </form>
    </div>
  );
};

export default Form;
