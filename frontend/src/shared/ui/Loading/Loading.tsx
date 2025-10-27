import { memo, type FC } from "react";
import { clsx } from "clsx";
import cls from "./Loading.module.scss";

interface LoadingProps {
  className?: string;
  size?: "small" | "medium" | "large";
  color?: "primary" | "white";
  variant?: "spinner" | "dots";
}

export const Loading: FC<LoadingProps> = memo((props) => {
  const {
    className,
    size = "medium",
    color = "white",
    variant = "spinner",
  } = props;
  if (variant === "dots") {
    return (
      <div className={cls.dots}>
        <div className={cls.dot} />
        <div className={cls.dot} />
        <div className={cls.dot} />
      </div>
    );
  }

  const loadingClassName = clsx([
    cls.loading,
    cls[size],
    cls[color],
    cls[variant],
    className,
  ]);

  return <div className={loadingClassName} />;
});
