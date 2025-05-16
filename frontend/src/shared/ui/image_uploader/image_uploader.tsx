"use client";
import { HTMLAttributes, useState } from "react";

import styles from "./image_uploader.module.scss";
import { IconCloudUpload } from "@tabler/icons-react";
import Button from "../button";

export interface ImageUploaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  uploadCallback: (file: File) => void;
}

export const ImageUploader = ({
  title,
  uploadCallback,
}: ImageUploaderProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isDragActive, setIsDragActive] = useState(false);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type.match("image.*")) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  // Clear selected file
  const clearSelection = () => {
    setFile(null);
    setPreviewUrl("");
  };

  // Handle form submission
  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!file) {
      alert("Пожалуйста, выберите изображение для загрузки.");
      return;
    }

    // Here you would normally send the file to a server
    uploadCallback(file);
    clearSelection();
  };

  // Handle drag events
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    const dt = e.dataTransfer;
    const files = dt.files;

    if (files.length) {
      const droppedFile = files[0];
      if (droppedFile.type.match("image.*")) {
        setFile(droppedFile);
        const reader = new FileReader();
        reader.onload = () => {
          setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(droppedFile);
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
      </div>

      <div className={styles.formContainer}>
        <div
          className={`${styles.dropzone} ${isDragActive ? styles.dropzoneActive : ""}`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <input
            type="file"
            className={styles.fileInput}
            accept="image/*"
            onChange={handleFileChange}
          />
          <div className={styles.dropzoneContent}>
            <div className={styles.iconContainer}>
              <IconCloudUpload size={50} strokeWidth={1} />
            </div>
            <h3 className={styles.dropzoneTitle}>Перетащите файлы сюда</h3>
            <p className={styles.dropzoneSubtitle}>или нажмите для выбора</p>
          </div>
        </div>

        {previewUrl && (
          <div className={styles.previewContainer}>
            <div className={styles.previewHeader}>
              <h3 className={styles.previewTitle}>Выбранное изображение</h3>
              <button
                type="button"
                className={styles.clearButton}
                onClick={clearSelection}
              >
                Очистить
              </button>
            </div>
            <div className={styles.imageContainer}>
              <img
                src={previewUrl}
                alt="Preview"
                className={styles.previewImage}
              />
            </div>
          </div>
        )}

        <div className={styles.actionContainer}>
          <Button onClick={handleSubmit} className={styles.uploadButton}>
            Загрузить изображение
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
