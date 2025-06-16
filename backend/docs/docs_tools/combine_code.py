import os


def combine_code_files(root_dir, output_file, excluded_dirs=None):
    """
    Объединяет код из всех файлов в папке и подпапках в один файл.
    Исключает указанные директории (по умолчанию 'venv').

    :param root_dir: Путь к корневой папке с кодом
    :param output_file: Файл для вывода результата
    :param excluded_dirs: Список исключаемых папок
    """
    if excluded_dirs is None:
        excluded_dirs = ["venv"]

    with open(output_file, "w", encoding="utf-8") as out_f:
        for root, dirs, files in os.walk(root_dir):
            # Исключаем указанные директории
            dirs[:] = [d for d in dirs if d not in excluded_dirs]

            for file in files:
                if not file.endswith(
                    (".py", ".js", ".html", ".scss", ".tsx", ".jsx", "ts")
                ):  # Ваши расширения
                    continue
                file_path = os.path.join(root, file)
                try:
                    with open(file_path, "r", encoding="utf-8") as in_f:
                        content = in_f.read()

                    # Записываем заголовок файла
                    relative_path = os.path.relpath(file_path, root_dir)
                    out_f.write(f"###### {relative_path}\n")
                    out_f.write(content)
                    out_f.write("\n\n")  # Добавляем отступ между файлами

                except (UnicodeDecodeError, PermissionError) as e:
                    print(f"Пропущен файл {file_path} ({str(e)})")


if __name__ == "__main__":
    # Настройки
    SOURCE_DIR = (
        r"C:\home\project\margeletV2"  # Текущая папка (можно указать любой путь)
    )
    OUTPUT_FILE = "combined_code.txt"
    EXCLUDED_DIRS = [
        ".venv",
        ".git",
        "__pycache__",
        "backend.egg-info",
        "node_modules",
        ".next",
        "api_auto",
    ]  # Папки для исключения

    print(f"Объединение файлов из {SOURCE_DIR}...")
    combine_code_files(SOURCE_DIR, OUTPUT_FILE, EXCLUDED_DIRS)
    print(f"Готово! Результат сохранён в {OUTPUT_FILE}")
