'use client';
import { HTMLAttributes } from 'react';

import styles from './create_group.module.scss';
import Form from '@/shared/ui/form_page';
import Container from '@/shared/ui/container';
import InputText from '@/shared/ui/inputs/input_text';
import Button from '@/shared/ui/button';
import Textarea from '@/shared/ui/inputs/textarea';
import { apiGroup } from '@/entities/group/model';
import { useRouter } from 'next/navigation';

export interface CreateGroupProps extends HTMLAttributes<HTMLDivElement> {}

export const CreateGroup = ({}: CreateGroupProps) => {
  const router = useRouter();

  const { mutate } = apiGroup.post();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;

    if (!title || !description) return;

    mutate({
      requestBody: {
        title: title,
        description: description,
      },
    });

    router.push('/communication');
  };

  return (
    <Form title="Создание группы">
      <form onSubmit={onSubmit} className={styles.group_form}>
        <InputText type="text" placeholder="Моя группа" name="title" labelText="Название" />
        <Textarea
          placeholder="Расскажите о вашей группе"
          name="description"
          labelText="Описание"
          classNameInput={styles.input_description}
        />
        <Button type="submit">Создать</Button>
      </form>
    </Form>
  );
};

export default CreateGroup;
