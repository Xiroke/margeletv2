"use client";
import { HTMLAttributes, useState, useEffect } from "react";

import styles from "./group_settings.module.scss";
import Container from "@/shared/ui/container";
import { apiGroup } from "@/entities/group/model";
import ImageUploader from "@/shared/ui/image_uploader";
import { useAppSelector } from "@/shared/lib/hooks";
import { useRouter } from "next/navigation";
import { IconArrowBackUp } from "@tabler/icons-react";
import { useToastStatus } from "@/shared/lib/hooks/use_toast";
import InputText from "@/shared/ui/inputs/input_text";
import uploadAvatar from "@/features/upload_avatar_group/model";
import uploadPanorama from "@/features/upload_panorama_group/model";
import Button from "@/shared/ui/button";
import clsx from "clsx";

export interface GroupSettingsProps extends HTMLAttributes<HTMLDivElement> {}

export const GroupSettings = ({}: GroupSettingsProps) => {
  const groupId = useAppSelector((state) => state.group.id);
  const groupTitle = useAppSelector((state) => state.group.title);

  const router = useRouter();

  const showToast = useToastStatus();

  const { mutateAsync: updateTitle } = apiGroup.updateTitle();

  useEffect(() => {
    // bassicaly groupId is null when user open group settings repeatedly after opening broswer
    // groupId set when user click on specific group in group list
    if (!groupId || !groupTitle) {
      router.push("/communication");
    }
  }, [groupId, groupTitle]);

  if (!groupId || !groupTitle) {
    // hard check
    return null;
  }

  const [inputTitle, setInputTitle] = useState<string>(groupTitle);

  const isChanged = inputTitle !== groupTitle;

  const rejectChanges = () => {
    setInputTitle(groupTitle);
  };

  const acceptChanges = async () => {
    try {
      await updateTitle({
        groupId,
        requestBody: inputTitle,
      });
    } catch (e) {
      showToast("error", "Ошибка", "Не удалось сохранить изменения");
    }

    showToast("success", "Успех", "Изменения сохранены");
  };

  return (
    <Container className={styles.container}>
      <div className={styles.group_settings}>
        <div className={styles.back} onClick={router.back}>
          <IconArrowBackUp width={40} height={40} />
        </div>
        <div className={styles.settings}>
          <h1>Настройки группы</h1>
          <InputText
            value={inputTitle}
            placeholder="Название"
            name="title"
            onChange={(e) => setInputTitle(e.target.value)}
            labelText="Название группы"
          />
          <ImageUploader
            title="Загрузить аватар группы"
            uploadCallback={uploadAvatar}
          />
          <ImageUploader
            title="Загрузить панораму группы"
            uploadCallback={uploadPanorama}
          />
        </div>
      </div>
      <div className={clsx(styles.save, isChanged && styles.save_visible)}>
        У вас есть несохраненные изменения
        <Button className={styles.save_button} onClick={acceptChanges}>
          Сохранить
        </Button>
        <Button className={styles.cancel} onClick={rejectChanges}>
          Отменить
        </Button>
      </div>
    </Container>
  );
};

export default GroupSettings;
