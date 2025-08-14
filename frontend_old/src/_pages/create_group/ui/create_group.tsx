"use client";
import { HTMLAttributes } from "react";

import styles from "./create_group.module.scss";
import Form from "@/shared/ui/form_page";
import Container from "@/shared/ui/container";
import InputText from "@/shared/ui/inputs/input_text";
import Button from "@/shared/ui/button";
import Textarea from "@/shared/ui/inputs/textarea";
import { apiGroup } from "@/entities/group/model";
import { useRouter } from "next/navigation";
import FormPage from "@/shared/ui/form_page";
import { useToastStatus } from "@/shared/lib/hooks/use_toast";
import { ApiError } from "@/shared/api/requests";

export const CreateGroup = () => {
  const router = useRouter();
  const showToast = useToastStatus();

  const { mutateAsync } = apiGroup.post();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    if (!title || !description) return;

    try {
      await mutateAsync({
        requestBody: {
          title: title,
          description: description,
        },
      });

      router.push("/communication");
    } catch (error) {
      console.error(error);
      if (error instanceof ApiError) {
        const detail =
          (
            error.body as {
              detail?: string;
            }
          )?.detail ?? "Unknown error";
        showToast("error", "Ошибка", detail);
      }
    }
  };

  return (
    <FormPage title="Создание группы">
      <form onSubmit={onSubmit} className={styles.group_form}>
        <InputText
          type="text"
          placeholder="Моя группа"
          name="title"
          labelText="Название"
          required={true}
        />
        <Textarea
          placeholder="Расскажите о вашей группе"
          name="description"
          labelText="Описание"
          classNameInput={styles.input_description}
          required={true}
        />
        <Button type="submit">Создать</Button>
      </form>
    </FormPage>
  );
};

export default CreateGroup;
