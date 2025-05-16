"use client";
import { HTMLAttributes } from "react";

import styles from "./group_settings.module.scss";
import Container from "@/shared/ui/container";
import { apiGroup } from "@/entities/group/model";
import ImageUploader from "@/shared/ui/image_uploader";
import { useAppSelector } from "@/shared/lib/hooks";
import { useRouter } from "next/navigation";
import { IconArrowBackUp } from "@tabler/icons-react";

export interface GroupSettingsProps extends HTMLAttributes<HTMLDivElement> {}

export const GroupSettings = ({}: GroupSettingsProps) => {
  const groupId = useAppSelector((state) => state.group.id);
  const router = useRouter();
  const uploadAvatar = apiGroup.uploadAvatar();
  const uploadPanorama = apiGroup.uploadPanorama();

  const uploadAvatarCallback = (file: File) => {
    if (!groupId) {
      alert("Попробуйте снова зайти в настройки группы");
      return;
    }

    uploadAvatar.mutate({
      groupId: groupId,
      formData: { image: file },
    });
  };

  const uploadPanoramaCallback = (file: File) => {
    if (!groupId) {
      alert("Попробуйте снова зайти в настройки группы");
      return;
    }

    uploadPanorama.mutate({
      groupId: groupId,
      formData: { image: file },
    });
  };

  return (
    <Container className={styles.container}>
      <div className={styles.group_settings}>
        <div className={styles.back} onClick={router.back}>
          <IconArrowBackUp width={45} height={45} />
        </div>
        <div className={styles.settings}>
          <h1>Настройки группы</h1>
          <ImageUploader
            title="Загрузить аватар группы"
            uploadCallback={uploadAvatarCallback}
          />
          <ImageUploader
            title="Загрузить панораму группы"
            uploadCallback={uploadPanoramaCallback}
          />
        </div>
      </div>
    </Container>
  );
};

export default GroupSettings;
