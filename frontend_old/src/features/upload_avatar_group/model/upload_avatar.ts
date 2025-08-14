import { apiGroup } from "@/entities/group/model";
import { useToastStatus } from "@/shared/lib/hooks/use_toast";

export const uploadAvatar = () => {
  const uploadAvatar = apiGroup.uploadAvatar();
  const showToast = useToastStatus();

  const uploadAvatarCallback = async (groupId: string, file: File) => {
    try {
      await uploadAvatar.mutateAsync({
        groupId: groupId,
        formData: { image: file },
      });
      showToast("success", "Успех", "Аватар успешно загружен");
    } catch (e) {
      showToast("error", "Ошибка", "Попробуйте снова зайти в настройки группы");
    }
  };

  return uploadAvatarCallback;
};

export default uploadAvatar;
