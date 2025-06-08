import { apiGroup } from "@/entities/group/model";
import { useToastStatus } from "@/shared/lib/hooks/use_toast";

export const uploadPanorama = () => {
  const uploadPanorama = apiGroup.uploadPanorama();
  const showToast = useToastStatus();

  const uploadPanoramaCallback = async (groupId: string, file: File) => {
    try {
      await uploadPanorama.mutateAsync({
        groupId: groupId,
        formData: { image: file },
      });
      showToast("success", "Успех", "Панорама успешно загружена");
    } catch (e) {
      showToast("error", "Ошибка", "Попробуйте снова зайти в настройки группы");
    }
  };

  return uploadPanoramaCallback;
};

export default uploadPanorama;
